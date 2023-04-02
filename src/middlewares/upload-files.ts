import multer from 'multer'
import { ApiError } from '../exceptions/error';

const fileStorage = multer.memoryStorage()

const fileFilter = function (req,file, cb) {
    console.log('file check')
    if(!file.mimetype.startsWith('image')) cb(ApiError.BadRequest('Wrong file!Please enter an image.'))    
    cb(null, true)
}

const uploader = multer({ storage:fileStorage, fileFilter })

export const uploadUserPhoto = uploader.single('photo') 
export const uploadShopItemPhotos = uploader.array('shopItemImages', 4)