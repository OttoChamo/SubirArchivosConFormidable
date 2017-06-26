var express = require('express');
var formidable = require('formidable');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res) {

  var form = new formidable.IncomingForm();

  //parseando el form que se recibe.

  form.parse(req, function(error, fields, files) {
    var objeto = {
      filePath: 'images/' + files.archivo.name,
      button: fields.boton
    };

    console.log('objeto: ' + JSON.stringify(objeto));

  });

  /**
   *  Al momento de que se detecta un archivo con el evento fileBegin,
   * podemos colocar por defecto la ruta donde queremos que se guarde.
   *  En este caso en el directorio /public/images de nuestro proyecto
   */
  form.on('fileBegin', function(name, file) {
    file.path = './public/images/'+ file.name;
  });

  // Cuando termina la subida del archivo mandamos la respuesta.

  form.on('end', function() {
    console.log('\n');
    console.log('subida exitosa');
    res.redirect('/');
  });


});

module.exports = router;
