<?php

//tiempo de espera en caso de tardar mas de 30 segundos una consulta grande
set_time_limit(3600);
//sin limite me memoria 
ini_set('memory_limit', '-1');
//ocultar los errores
error_reporting(0);

date_default_timezone_set('America/Mexico_City'); //Ajustando zona horaria


function ultimodiadelmes($mes) { 
      $month = date($mes);
      $year = date('Y');
      $day = date("d", mktime(0,0,0, $month+1, 0, $year));
 
      return date('Y-m-d', mktime(0,0,0, $month, $day, $year));
};
 
  /** Actual month first day **/
function primerdiadelmes($mes) {
  $month = date($mes);
  $year = date('Y');
  return date('Y-m-d', mktime(0,0,0, $month, 1, $year));
}

function conectarMySQL(){

    $dbhost="localhost";
    $dbuser="medica_webusr";
    $dbpass="tosnav50";
    $dbname="medica_registromv";
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
}

//Obtenemos la funcion que necesitamos y yo tengo que mandar 
//la URL de la siguiente forma api/api.php?funcion=login

$funcion = $_REQUEST['funcion'];



if ($funcion == 'temporal') {
    //Obtenemos la imagen que mandamos de angular
      if(isset($_FILES['file'])){
          //The error validation could be done on the javascript client side.       
          $file_name = $_FILES['file']['name'];
          $file_size =$_FILES['file']['size'];
          $file_tmp =$_FILES['file']['tmp_name'];
          $file_type=$_FILES['file']['type'];   
          $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

          move_uploaded_file($file_tmp,"../img/temp/".$file_name);
          $resultado = array('ubicacion' => "img/temp/".$file_name, 'temporal' => $file_tmp);

          echo json_encode($resultado);

          
      }

}

if($funcion == 'login'){
    
    //Obtenemos los datos que mandamos de angular
    $postdata = file_get_contents("php://input");
    //aplicacmos json_decode para manejar los datos como arreglos de php
    //En este caso lo que mando es este objeto JSON {user:username,psw:password}
    $data = json_decode($postdata);
    $conexion = conectarMySQL();
        
    //Obtenemos los valores de usuario y contraseña 
    $user = trim($data->user);
    $psw = trim($data->psw);
    
    $sql = "SELECT * FROM Usuario
            WHERE Usu_login = '$user' and Usu_pwd = '" . md5($psw) . "'";

    $result = $conexion->query($sql);
    $numero = $result->rowCount();
    
    if ($numero>0){

        $datos = $result->fetchAll(PDO::FETCH_OBJ);
        
    }else{

        $datos = array('respuesta' => 'El Usuario o contraseña son inorrectos');
    }
    
    echo json_encode($datos);

    $conexion = null;

}

if($funcion == 'buscaExpedientes'){
    
   
}


if($funcion == 'unidades'){

    $conexion = conectarMySQL();

    $sql = "SELECT * FROM Compania order BY Cia_nombrecorto";

    $result = $conexion->query($sql);

    $resultado = array();
    $total = array();

    //$datos = $result->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $value) {

        $clave = $value['Cia_clave'];
        $nombre = $value['Cia_nombrecorto'];
        $activa = $value['Cia_activa'];

        if ($activa == 'S') {

            $resultado['clave'] = $clave;
            $resultado['nombre'] = $nombre;

            array_push($total, $resultado);

        }elseif ($activa == 'N' && $clave == '52') {

            $resultado['clave'] = $clave; 
            $resultado['nombre'] = $nombre;

            array_push($total, $resultado);

        }

        

    } 

    echo json_encode($total);

    $conexion = null;

}


if($funcion == 'usuario'){

    $postdata = file_get_contents("php://input");
    //aplicacmos json_decode para manejar los datos como arreglos de php
    //En este caso lo que mando es este objeto JSON {user:username,psw:password}
    $data = json_decode($postdata);
    $conexion = conectarMySQL();
    
    $nombre = $data->nombre;
    $usuario = $data->usuario;
    $psw = md5($data->psw);
    $admin = $data->admin;
    $correo = $data->correo;
    $empresa = $data->empresa;


    $sqlDet = "SELECT * FROM UsuarioInfoWeb 
                WHERE USU_login = '$usuario'";
    $result = $conexion->query($sqlDet);
    $numero = $result->rowCount();
    
    if ($numero>0){

        $respuesta = array('respuesta' => 'El Usuario ya existe');
        
    }else{

        $sql = "INSERT INTO UsuarioInfoWeb (
                        USU_nombre
                        ,USU_login
                        ,USU_password
                        ,USU_fechaReg
                        ,USU_activo
                        ,USU_administrador
                        ,USU_correo
                        ,Cia_clave
                ) VALUES (:nombre,:usuario,:psw,now(),1,:admin,:correo,:empresa)";

        $temporal = $conexion->prepare($sql);

        // $temporal->bindParam("clave", $clave, PDO::PARAM_INT);
        // $temporal->bindParam("nombre", $nombre, PDO::PARAM_STR);

        $temporal->bindParam("nombre", $nombre);
        $temporal->bindParam("usuario", $usuario);
        $temporal->bindParam("psw", $psw);
        $temporal->bindParam("admin", $admin);
        $temporal->bindParam("correo", $correo);
        $temporal->bindParam("empresa", $empresa);
        
        if ($temporal->execute()){
            $respuesta = array('respuesta' => "Los Datos se guardaron Correctamente");
        }else{
            $respuesta = array('respuesta' => "Los Datos No se Guardaron Verifique su Información");
        }
        
    }


    
    echo json_encode($respuesta);

    $conexion = null;

}


if($funcion == 'usuarios'){

    $conexion = conectarMySQL();

    $sql = "SELECT * FROM Usuario";

    $result = $conexion->query($sql);

    $datos = $result->fetchAll(PDO::FETCH_OBJ);
    
    echo json_encode($datos);

    $conexion = null;

}


?>