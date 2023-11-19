<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, PUT');

header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");


    include "conexion.php";
    try{

        $datosregistro = file_get_contents("php://input");
        $request = json_decode($datosregistro, FALSE);
        if(isset($datosregistro) && ($request->email != '') && ($request->password != '')){

            $consultafiltro = "SELECT * FROM usuarios WHERE usuario = ?";
            $basedatosfiltro = new conexion_db;
            $consulta_buscar_usuario = $basedatosfiltro->accesoDB()->prepare($consultafiltro);
            $consulta_buscar_usuario->execute([$request->email]);
            $resultado_filtro = $consulta_buscar_usuario->fetchAll();

            if(sizeof($resultado_filtro) == 0){

                    $consulta = "INSERT into usuarios (usuario, contrasena) values (?,?)";
                    $basedatos = new conexion_db;
                    $consulta_registro = $basedatos->accesoDB()->prepare($consulta);
                    $resultado = $consulta_registro->execute([$request->email, $request->password]);

                    if($resultado){
                    
                        $data = array('mensaje'=>'Registro completado', 'email'=>$request->email);
                        echo json_encode($data);
                    }else{
                        $data = array('mensaje'=>'El registro no ha sido posible');
                        echo json_encode($data);
                    }
            }else{
                $data = array('mensaje'=>'Usuario existente');
                        echo json_encode($data);
            }
        }else{
            echo json_encode([
                "resultado" => 'No hay datos',
            ]);
        }

    }catch(PDOexception $e){
        echo 'Se ha producido un error' . $e->getMessage();
    }

?>