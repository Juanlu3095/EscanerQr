<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, PUT');

header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");


    include "conexion.php";
    try{

        $logindata = file_get_contents("php://input");
        $request = json_decode($logindata, FALSE);
        if(isset($logindata) && ($request->email != '') && ($request->password != '')){

            $consulta = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
            $basedatos = new conexion_db;
            $consulta_login = $basedatos->accesoDB()->prepare($consulta);
            $consulta_login->execute([$request->email, $request->password]);
            $resultado = $consulta_login->fetchAll();

            if(sizeof($resultado) == 1){
            
                $data = array('mensaje'=>'Usuario correcto', 'email'=>$request->email);
                echo json_encode($data);
            }else{
                $data = array('mensaje'=>'Usuario incorrecto');
                echo json_encode($data);
            }
            
            }else{
                
                $data = array('mensaje'=>'Por favor, rellene el formulario');
                echo json_encode($data);
            }

    }catch(PDOexception $e){
        echo 'Se ha producido un error' . $e->getMessage();
    }

?>