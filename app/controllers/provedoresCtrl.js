app.controller('provedorCtrl', function($scope, $rootScope) {

    $scope.inicio = function(){

        $rootScope.guardado = false;
        $rootScope.cerrar = true;

        $scope.datos = {
            tipo:'',
            persona:'Moral',
            nombre:'',
            nombrecorto:'',
            rfc:'',
            correo:'',
            credito:'',
            observaciones:'',
            banco:'',
            beneficiario:'',
            sucursal:'',
            cuenta:'',
            clabe:'',
            cie:'',
            observacionesbanco:''
        }
    }

    angular.element('#rfc').on('keydown',function(e){
        console.log(e.keycode);
    });

    $scope.guardar = function(){

        $rootScope.guardado = true;
        $rootScope.cerrar = false;
        console.log($scope.datos);
    }

});


app.controller('busquedaProvedorCtrl', function($scope, $rootScope) {

    $scope.inicio = function(){
        
    }

    $scope.$on('event:dataTableLoaded', function(event, data) { 
        console.log('event:dataTableLoaded:'+data); 
        $scope.tableId = data.id;

        $scope.Buscar = function() {
            $scope.searchData = angular.copy($scope.datos);
            console.log("search");
            $('#'+$scope.tableId).DataTable().ajax.reload();
        };
    });

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            "url": ruta,
            "type": 'POST',
            "data": function ( d ) {
                    console.log("data");
                    d.search = $scope.datos || {}; //search criteria
                    return JSON.stringify(d);
            }
        })
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"] ])
        // .withOption('serverSide', true)
        .withPaginationType('full_numbers')
        .withOption('language', {
            paginate: {
                first: "«",
                last: "»",
                next: "→",
                previous: "←"
            },
            search: "Buscar:",
            loadingRecords: "Cargando Información....",
            lengthMenu: "    Mostrar _MENU_ entradas",
            processing: "Procesando Información",
            infoEmpty: "No se encontro información",
            emptyTable: "Sin Información disponible",
            info: "Mostrando pagina _PAGE_ de _PAGES_ , Registros encontrados _TOTAL_ ",
            infoFiltered: " - encontrados _MAX_ coincidencias"
        })
        // Add Bootstrap compatibility
        .withBootstrap()
        // Add ColVis compatibility
        .withColVis()
        // Add a state change function
        .withColVisStateChange(function(iColumn, bVisible) {
            console.log('The column' + iColumn + ' has changed its status to ' + bVisible)
        })

        .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td', nRow).bind('click', function() {
                $scope.$apply(function() {
                    $scope.muestraDetalle(aData);
                });
            });
            return nRow;
        })

        .withOption("colVis",{
            buttonText: "Mostrar / Ocultar Columnas"
        })
        // Exclude the last column from the list
        // .withColVisOption('aiExclude', [2])

        // Add ColReorder compatibility
        .withColReorder()
        // Set order
        // .withColReorderOrder([1, 0, 2])
        // Fix last right column
        .withColReorderOption('iFixedColumnsRight', 1)
        .withColReorderCallback(function() {
            console.log('Columns order has been changed with: ' + this.fnOrder());
        })
        //Add Table tools compatibility

        .withTableTools('js/swf/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([

            {
                "sExtends":     "copy",
                 "sButtonText": "Copiar"
            },
            {
                'sExtends': 'collection',
                'sButtonText': 'Exportar',
                'aButtons': ['xls', 'pdf']
            }
        ]);
        
    $scope.dtColumns = [

        DTColumnBuilder.newColumn('Exp_folio').withTitle('Folio'),
        DTColumnBuilder.newColumn('UNI_nombreMV').withTitle('Unidad'),
        DTColumnBuilder.newColumn('Exp_poliza').withTitle('Poliza'),
        DTColumnBuilder.newColumn('Exp_siniestro').withTitle('Siniestro'),
        DTColumnBuilder.newColumn('EXP_reporte').withTitle('Reporte'),
        DTColumnBuilder.newColumn('Exp_completo').withTitle('Lesionado'),
        DTColumnBuilder.newColumn('Exp_fecreg').withTitle('Fecha Atención'),
        DTColumnBuilder.newColumn('RIE_nombre').withTitle('Riesgo'),
        DTColumnBuilder.newColumn('EXP_estatus').withTitle('Estatus')
    ];

});