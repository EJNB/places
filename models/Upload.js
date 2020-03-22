const cloudinary = require('cloudinary');
const secret = require('../config/secret');

//configuracion de cloudinary
cloudinary.config(secret.cloudinary);

module.exports = function (imagePath) {
    return new Promise((resolve, reject)=> {
        /* Para subir las imagenes usaremos una promesa, ya q debmos esperar q se suba la img. */
        cloudinary.uploader.upload(imagePath, result => {
            console.log(result);
            if(result.secure_url) // Si el obj de repuesta tiene la prop secure_url then ok
                return resolve(result.secure_url);
            return reject(new Error('Error with cloudinary'));
        })
    });
};
