<?php

$ruta = '../../../public/files/'; //Decalaramos una variable con la ruta en donde almacenaremos los archivos
$mensage = ''; //Declaramos una variable mensaje quue almacenara el resultado de las operaciones.



foreach ($_FILES as $key) { //Iteramos el arreglo de archivos

    $proceso = $_POST['proceso'];
    $subproceso = $_POST['subproceso'];
    $documento = $_POST['documento'];
    $version = $_POST['version'];
    $fechaActualizacion =$_POST['fechaActualizacion'];
    $responsable = $_POST['responsable'];
    $responsableAprobacion = $_POST['responsableAprobacion'];
    $externo = $_POST['externo'];
    $cambio = $_POST['cambio'];
    $estado = "VIGENTE";
     
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "sgc";

    $respuesta = array();

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    
    
    
    
    
    //consultado siglas para armar el nombre     
    //sigla de proceso     
    $sql = "SELECT sigla  FROM procesos WHERE id='$proceso'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $sigla_proceso = $row["sigla"];
        }
    } else {
        echo "0 results proceso";
    }
    //sigla de subproceso 
    $sql = "SELECT sigla  FROM tipodocumentos WHERE id='$documento'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            $sigla_documento = $row["sigla"];
        }
    } else {
        echo "0 results proceso";
    }

    $sql = "SELECT id FROM archivos WHERE proceso='$proceso' AND tipoDocumento='$documento'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $number = $result->num_rows + 1;
    } else {
        $number = 1;
    }


    if ($key['error'] == UPLOAD_ERR_OK) {//Si el archivo se paso correctamente Ccontinuamos 
        $NombreOriginal = $key['name']; //Obtenemos el nombre original del archivo
        $temporal = $key['tmp_name']; 
        
        $extension = pathinfo($NombreOriginal, PATHINFO_EXTENSION);
        
        $NombreGuardar = $NombreOriginal;
 //Movemos el archivo temporal a la ruta especificada	*
   	
        $codigo = $sigla_proceso."-".$sigla_documento."-".$number;
    }

    if ($key['error'] == '') { //Si no existio ningun error, retornamos un mensaje por cada archivo subido

       
   date_default_timezone_set('America/Bogota');
   $hoy = date("Y-m-d");
       
        $sql = "INSERT INTO archivos(codigo,nombre,extension,proceso,subproceso,tipoDocumento,responsable,responsableAprobacion,externo,fechaIngreso)
               VALUES ('$codigo','$NombreGuardar','$extension','$proceso','$subproceso','$documento','$responsable','$responsableAprobacion','$externo','$hoy')";


       if ($conn->query($sql) === TRUE) {
       $ultimoId = $conn->insert_id;

        $NombreOriginal = $NombreOriginal."_".$ultimoId."_1.".$extension;    
        $Destino = $ruta . $NombreOriginal; //Creamos una ruta de destino con la variable ruta y el nombre original del archivo	
        $destino_guardar = "http://" . $_SERVER['HTTP_HOST'] . "/sgc/public/files/" . $NombreOriginal . "";
        move_uploaded_file($temporal, $Destino);
        
        
        
    
       
            $sql = "INSERT INTO documentos(url,idArchivo,fecha,version,nota,estado)
                    VALUES ('$destino_guardar','$ultimoId','$fechaActualizacion','$version','$cambio','$estado')";
            
            if ($conn->query($sql) === TRUE) {
            $respuesta[] = array(
                "nombre" =>  $NombreGuardar ,
                "respuesta" => "OK"  
                );
            }
            
            
        } else {
            $respuesta[] = array(
                "nombre" =>  $NombreGuardar ,
                "respuesta" => "KO"
            );
        }

        $conn->close();
    }

    if ($key['error'] != '') {//Si existio algún error retornamos un el error por cada archivo.
        $respuesta[] = array(
            "nombre" =>  $NombreGuardar,
            "respuesta" => "KO"
        );
    }
}
echo '' . json_encode($respuesta) . '';
?>