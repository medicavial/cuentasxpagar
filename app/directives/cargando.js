//funcion para poner un loading genera un css
app.directive('loading', function () {
    return {
        restrict: 'AE',
        replace: 'false',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    }
});

//funcion para poner folio mv asociado a una funcion
app.directive('folio', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {

          var functionToCall = scope.$eval(attrs.folio);

          var rellenaFolio = function(folio){

            if (folio != '') {

              var totalletras = folio.length;

              var letras = folio.substr(0,4);
              var numeros = folio.substr(4,totalletras);

              if(letras.length < 4 ){

                var faltantes = 4 - letras.length;

                for (var i = 0; i < faltantes; i++) {

                  var letra = letras.charAt(i);
                  letras = letras + "0";
                }
              }

              if(numeros.length < 6 ){

                var faltantes = 6 - numeros.length;

                for (var i = 0; i < faltantes; i++) {
                  
                  numeros = "0" + numeros;
                }
              }

              folio = letras + numeros;

              return folio;

            }else{

              return folio

            }
          }
          
          modelCtrl.$parsers.push(function (inputValue) {
             if (inputValue == undefined) return '' 
             var transformedInput = inputValue.toUpperCase();
             if (transformedInput!=inputValue) {
                modelCtrl.$setViewValue(transformedInput);
                modelCtrl.$render();
             }         

             return transformedInput;         
          });

          element.on('keydown', function(e){
                
                // console.log(scope);
                // console.log(element);
                // console.log(attrs);
                console.log(modelCtrl);
                

                var cantidad = modelCtrl.$modelValue.length;

                console.log(cantidad);
                console.log(e);

                //los primero cuatro caracteres NO deben ser numeros
                if(cantidad < 4){
                  if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
                        e.preventDefault();
                    }
                }

                //los ultimos 6 NO deben ser letras
                if(cantidad > 3 && cantidad < 10){
                  if (e.keyCode >= 65 && e.keyCode <= 90) {
                        e.preventDefault();
                  }
                }

                //Si son mas de 10 digitos no escribas mas
                if(cantidad > 9){
                    
                    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
                      e.preventDefault();
                    }else{
                      console.log('Presionaste ' + e.keyCode);
                    } 

                }

                if (e.keyCode == 13 || e.keyCode == 9) {

                      if (cantidad > 4) {

                          functionToCall(modelCtrl.$modelValue);
                            
                      };
                      
                          
                }


          });



      }

    };
    
});

//funcion para convertir mayusculas

//se aplica poniendo en un input mayusculas
//ejemplo <input type="text" id="archivos" mayusculas/>
app.directive('mayusculas', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
});


//funcion para poner numero 
//ejemplo <input type="text" id="archivos" numeros/>
app.directive('numeros', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});
