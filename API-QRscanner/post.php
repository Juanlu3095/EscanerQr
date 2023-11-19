<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, PUT');

header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");


    include "conexion.php";
    try{
        $jsoncontent = file_get_contents("php://input");
        $jsonQr = json_decode($jsoncontent, false);
        if (!$jsonQr) {
            exit("No hay datos");
        }

        $fecha_actual = date('d-m-Y');

        $consulta = "INSERT into asistentes (datos_registro, fecha_registro) values (?,?)";
        $basedatos = new conexion_db;
        $consulta_qr = $basedatos->accesoDB()->prepare($consulta);
        $resultado = $consulta_qr->execute([$jsonQr->value, $fecha_actual]);

        /* echo json_encode([
            "resultado" => $jsonQr->value,
        ]); */

        $json_pretty = json_encode($jsonQr->value, JSON_PRETTY_PRINT);

        echo $json_pretty;


    }catch(PDOexception $e){
            echo 'Se ha producido un error' . $e->getMessage();
        }
    
?>