/*para q podamos leer archivos q vengan en la peticion del cliente, es necesario otro middleware llamado multer*/
const multer = require('multer');

module.exports = multer({
    dest: 'uploads/'
});
