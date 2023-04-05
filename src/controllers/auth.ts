import express from 'express';
import dayjs from 'dayjs';

import AuthService from '../services/auth';

import { ControllerRequest, ControllerResponse } from '../types/controllers';
import { User } from '../entities/user.entity';
import { Tokens } from '../types/token';
import { REFRESH_TOKEN } from '../constants/index';

class AuthController {
  async signUp(
    req: express.Request<any, User>,
    res: express.Response
  ): ControllerResponse<Tokens> {
    const confirmUrl = `${req.protocol}://${req.hostname}${req.hostname !== 'localhost' ? '' : ':6969'
      }/auth/confirmEmail/`;

    await AuthService.signUp(req.body, confirmUrl);

    return res.status(201).send();
  }

  async login(
    req: express.Request<any, User>,
    res: express.Response
  ): ControllerResponse<Tokens> {
    const { email, password } = req.body;

    const tokens = await AuthService.login({ email, password });

    return res
      .cookie(REFRESH_TOKEN, tokens.refreshToken, {
        expires: dayjs().add(30, 'days').toDate(),
        httpOnly: true,
      })
      .status(202)
      .json({ accessToken: tokens.accessToken })
      .end();
  }

  async confirmEmail(
    req: express.Request<any, void>,
    res: express.Response
  ): ControllerResponse<void> {
    const { token } = req.params;

    await AuthService.confirmEmail(token);

    return res.status(200).send();
  }

  async forgotPassword(
    req: express.Request<any, void>,
    res: express.Response
  ): ControllerResponse<void> {
    const { email } = req.body;

    const confirmUrl = `${req.protocol}://${req.hostname}:6969/auth/resetPassword/`;

    await AuthService.forgotPassword({ email, confirmUrl });

    return res.status(200).send();
  }

  async resetPassword(
    req: express.Request<any, void>,
    res: express.Response
  ): ControllerResponse<void> {
    const { token } = req.params;
    const { password } = req.body;

    await AuthService.resetPassword(token, password);

    return res.status(201).send();
  }

  async updatePassword(
    req: ControllerRequest,
    res: express.Response<void>
  ): ControllerResponse<void> {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    await AuthService.changePassword({ currentPassword, newPassword, id });

    return res.status(201).send();
  }
}

export default new AuthController();
