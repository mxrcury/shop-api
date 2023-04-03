import bcrypt from 'bcrypt';

import { UserModel } from '../models/user';
import { ApiError } from '../exceptions/error';
import { LoginInput, UserInput } from '../types/auth';
import TokenService from './token';
import { Tokens } from '../types/token';
import EmailService from './email';
import { EmailOptions } from '../types/email';
import { ConfirmTokenModel } from '../models/confirmToken';
import validateDate from '../utils/validateDate';
import { PasswordsInput } from '../types/auth';
import { TOKEN_NOT_FOUND, USER_NOT_FOUND_TOKEN } from '../constants';

class AuthService {
    async signUp (userInput: UserInput, confirmUrl:string): Promise<void> {
        const { password, passwordConfirmed, email } = userInput

        if (password !== passwordConfirmed) {
            throw ApiError.BadRequest('Passwords are not equal');
        }
        const userExists = await UserModel.exists({ email });

        if (userExists) {
            throw ApiError.BadRequest('User with this email already exists');
        }

        const hashingSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hashingSalt);

        const userPayload = { ...userInput, password: hashedPassword };

        const user = await UserModel.create(userPayload);

        const token = await TokenService.createConfirmToken(user.id)

        await EmailService.sendConfirmationEmail(user.email, confirmUrl)

        return;
    }
    async login (authInput: LoginInput): Promise<Tokens> {
        const { password, email } = authInput;

        if (!email || !password) {
            throw ApiError.BadRequest('You did not entered data.');
        }

        const user = await UserModel.findOne({ email });

        const userExists = user && user.email === email;

        if (!userExists) {
            throw ApiError.NotFound('User with such email does not exist.');
        }

        if(!user.confirmedEmail) {
            throw ApiError.BadRequest('You do not confirmed your email.')
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw ApiError.BadRequest('You entered wrong password.');
        }

        const payload = {
            id: user._id,
            role: user.role,
        };
        const tokens = await TokenService.generateTokens(payload);

        return tokens;
    }

    async confirmEmail (token: string): Promise<void> {
        const isTokenExists = await ConfirmTokenModel.findOne({ token })

        if(!isTokenExists) {
            throw ApiError.NotFound(TOKEN_NOT_FOUND)
        }

        await ConfirmTokenModel.deleteOne({ token })
        
        const user = await UserModel.findByIdAndUpdate(isTokenExists.userId, { confirmedEmail:true })

        if(!user) {
            throw ApiError.NotFound(USER_NOT_FOUND_TOKEN)
        }

        return
    }

    async forgotPassword (options:EmailOptions): Promise<void> {
        const { email, confirmUrl } = options

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.NotFound('User with such email does not exists.');
        }

        const token = await TokenService.createConfirmToken(user.id)

        await EmailService.sendEmail({
            from: 'Dmytro Honchar <mxrcury6@protonmail.com>',
            to: email,
            subject: 'Reset your password',
            text: 'Please read below for resetting your password',
            html: `<div>
            <h1>Rest Password</h1>
            <p>If you want to reset your password, please enter on this link <a href='${confirmUrl + token}' >Click here!</a></p>
            <b>DON'T DO IF YOU ARE NOT SURE IN THIS ACTION!</b>
            </div>`,
        });

        return;
    }
    async resetPassword (token:string,password:string):Promise<void> {
        const isTokenExists = await ConfirmTokenModel.findOne({ token })

        if(!isTokenExists) {
            throw ApiError.NotFound(TOKEN_NOT_FOUND)
        }
        await ConfirmTokenModel.deleteOne({ token })
        
        const isValidDate = validateDate(isTokenExists.expiringDate)
 
        
        if(!isValidDate) {
            throw ApiError.BadRequest('Your token has been expired.')
        }
        
        const hashingSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hashingSalt);
        
        const user = await UserModel.findByIdAndUpdate(isTokenExists.userId, { password:hashedPassword })

        if(!user) {
            throw ApiError.NotFound(USER_NOT_FOUND_TOKEN)
        }

        return
    }

    async changePassword ({ currentPassword, newPassword, id }:  PasswordsInput): Promise<void> {
        const user = await UserModel.findById(id)

        if(!user) {
            throw ApiError.NotFound('User not found.')
        }
        const isValidPassword = await bcrypt.compare(currentPassword, user.password)

        if(!isValidPassword) {
            throw ApiError.BadRequest('You entered wrong password.')
        }

        const hashingSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, hashingSalt)

        await UserModel.findByIdAndUpdate(id, { password: hashedPassword })

        return
    }
    // async refresh () {}

}
export default new AuthService()