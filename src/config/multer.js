import multer from 'multer';

// configuración de almacenamiento para multer
const storage = multer.diskStorage({ 
    
    destination: function (req, file, cb) {       
        cb(null, 'public/imagenes'); // ruta donde se guardaran las imagenes
    },
    filename: function (req, file, cb)  {
        const now = new Date();
        let filename = now.getTime() + file.originalname
        console.log(filename)
        cb(null, filename );
    }
    
})

export {storage}