const cloudinary = require('cloudinary');
const secret = require('../config/secret');

//configuracion de cloudinary
cloudinary.config(secret.cloudinary);

module.exports = function (imagePath) {
    return new Promise((resolve, reject)=> {
        //para subir una imagen usamos el obj cloudinary, previmente configurado
        cloudinary.uploader.upload(imagePath, result => {
            console.log(result)
            if(result.secure_url)
                return resolve(result.secure_url);
            return reject(new Error('Error with cloudinary'));
        })
    });
};
