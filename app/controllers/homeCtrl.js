app.controller('homeCtrl', function($scope, $rootScope,$upload) {
    
    $scope.inicio = function(){

        $scope.files = [];

    }

    $scope.onFileSelect = function($files) {

	    var archivo = $files.length;

	    for (var i = 0; i < $files.length; i++) {

	      var file = $files[i];

	      console.log(file);

	      //try{

	      //   $scope.nombreimagen = file.name;

	      //   if (file.type.indexOf('image') == -1) {

	      //        throw 'La extension no es de tipo imagen'; 
	      //   }

	      //   $scope.upload = $upload.upload({
	      //       url: 'api/api.php?funcion=temporal', //upload.php script, node.js route, or servlet url
	      //       method: 'POST',
	      //       // headers: {'headerKey': 'headerValue'}, withCredential: true,
	      //       data: {dato: 'datos Enviados'},
	      //       file: file
	      //       // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
	      //        set file formData name for 'Content-Desposition' header. Default: 'file' 
	      //       //fileFormDataName: myFile,
	      //       /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
	      //       //formDataAppender: function(formData, key, val){} 
	      //   }).progress(function(evt) {
	      //       console.log('porcentaje: ' + parseInt(100.0 * evt.loaded / evt.total));
	      //   }).success(function(data, status, headers, config) {

	      //       // imagen se guardo con exito en temporales
	      //       $scope.files.push({
	      //         name:file.name,
	      //         ubicacion:data.ubicacion
	      //       });

	      //   });

	      // }catch(err){

	      //     alert(err);

	      // }

	      //para medir el peso del archivo
	      // }else{
	      //     if (file.size > 2097152){
	      //        $scope.error ='El archivo excede los 2MB dispnibles';
	      //   }

	    }

	  }
    
});


///estructura de controlador
// app.controller('nombredelcontroladorCtrl',function (dependencias $scope,nombrefactoria,$rootScope) {
// 	// codigos con funciones varaibles
// 	// $scope.variable
// })