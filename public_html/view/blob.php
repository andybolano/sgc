<?php 
header("Content-type: image/gif"); 
if(isset($_GET['id'])){ 
    $id = $_GET['id']; 
    $link = mysql_connect("190.8.176.75", "citcodaz_root", "c4m4r4comercio") or die ("ERROR AL CONECTAR"); 
    $db_select = mysql_select_db("citcodaz_ccBD")or die ("ERROR AL SELECCIONAR DB"); 
     
    $q = "SELECT foto FROM empleados WHERE noDocumento = $id"; 
    $result = mysql_query($q, $link) or die ("Error al consultar"); 
     
    while ($row = mysql_fetch_assoc($result)) { 
    echo $row["foto"]; 
    } 
    mysql_free_result($result); 
    } else { 
        echo 'NO ID'; 
    }  
    
  
?>