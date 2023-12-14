<?php

// Incluye el archivo de conexión (dentro del server el archivo productos.php 
//debe salir dos carpetas afuera para llegar a la carpeta conPrincipal)
require('../../conPrincipal/index.php');


if (isset($_GET["creaProducto"])) {
    try {
        // Obtén los datos del cuerpo de la solicitud POST
        $data = json_decode(file_get_contents("php://input"));
        //extraer datos del producto tabla padre
        $nombre = $data->nombre;
        $descripcion = $data->descripcion;
        $idCategoria = $data->idCategoria;
        $precioVenta = $data->precioVenta;
        $precioCompra = $data->precioCompra;
        $descuento = $data->descuento;
        $porcentaje = $data->porcentaje;
        $fechaCreacion = $data->fechaCreacion;
        $codigoBarra = $data->codigoBarra;

        $insertaProducto = "INSERT INTO `producto`
        (`nombre`, `descripcion`, `precio`, `precioCompra`, `descuento`, `porcentaje`, `fechaCreacion`, `codigoBarra`, `Categoria_idCategoria`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Preparar la consulta
        $stmt = mysqli_prepare($conexionBD, $insertaProducto);

        if (!$stmt) {
            throw new Exception("Error al preparar la insercion de producto: " . mysqli_error($conexionBD));
        }

        mysqli_stmt_bind_param($stmt, "ssddiissi", $nombre, $descripcion, $precioVenta, $precioCompra, $descuento, $porcentaje, $fechaCreacion, $codigoBarra, $idCategoria);
        // Ejecutar la consulta (tabla padre)
        $result = mysqli_stmt_execute($stmt);

        //validar que se creo el registro padre
        if ($result) {
            //obtener el idProducto
            $consultaIdProducto = "SELECT idProducto 
              from producto  where codigoBarra = ?";
            $stmtId = mysqli_prepare($conexionBD, $consultaIdProducto);
            mysqli_stmt_bind_param($stmtId, "s", $codigoBarra);
            $resultE = mysqli_stmt_execute($stmtId);
            // Obtener el idProducto después de ejecutar la consulta
            mysqli_stmt_store_result($stmtId);
            // Vincular el resultado a una variable
            mysqli_stmt_bind_result($stmtId, $idProducto);
            // Obtener el valor
            mysqli_stmt_fetch($stmtId);
            // Cerrar la consulta preparada
            mysqli_stmt_close($stmtId);

            //obtener la caracteristicas
            $unidadMedicion = $data->unidadMedicion;
            $cantidadUnidades = $data->cantidadUnidades;
            $talla = $data->talla;
            $color = $data->color;
            $longitud = $data->longitud;
            $sabor = $data->sabor;
            $genero = $data->genero;
            $marca = $data->marca;

            //insertar las caracteristicas del producto
            $insertaCaracteristica = "INSERT INTO `caracteristicas`
            (`Producto_idProducto`, `unidadMedicion`, `cantidadUnidades`, `talla`, `color`, `longitud`, `sabor`, `genero`, `marca`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmtCaracteristicas = mysqli_prepare($conexionBD, $insertaCaracteristica);
            if (!$stmtCaracteristicas) {
                throw new Exception("Error al preparar la insercion de caracteristicas: " . mysqli_error($conexionBD));
            }

            //validar creacion de registro hijo (caracteristica)
            if ($stmtCaracteristicas) {
                // Vincular parámetros (especificar tipo de dato integer =i y double =d)
                mysqli_stmt_bind_param($stmtCaracteristicas, "isissssss", $idProducto, $unidadMedicion, $cantidadUnidades, $talla, $color, $longitud, $sabor, $genero, $marca);
                $resultCaracteristicas = mysqli_stmt_execute($stmtCaracteristicas);

                if (!$resultCaracteristicas) {
                    throw new Exception("Error al insertar caracteristicas: " . mysqli_error($conexionBD));
                }
                mysqli_stmt_close($stmtCaracteristicas);
            } else {
                // Manejo de errores
                http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
                echo json_encode(["success" => false, "message" => "Error al preparar la consulta de caracteristicas: " . mysqli_error($conexionBD)]);
                exit;
            }
            echo json_encode(["success" => true, "message" => "Producto y caracteristicas creadas"]);


            //obtener la imagenes del producto
            try {
                // Acceder a la información de los archivos
                $files = $data->files;
                // Carpeta donde se guardarán los archivos
                $carpetaDestino = "../../assets/img/prods-img/";
                // Iterar sobre los archivos
                foreach ($files as $index => $file) {
                    // Generar un nombre único para el archivo
                    $nombreArchivo = uniqid() . "_" . $_FILES['files']['name'][$index];
                    // Ruta completa del archivo en la carpeta destino
                    $rutaCompleta = $carpetaDestino . $nombreArchivo;

                    // Obtener información del archivo mediante $_FILES
                    $tmpName = $_FILES['files']['tmp_name'][$index]; //es el blob
                    $size = $_FILES['files']['size'][$index];

                    // Mover el archivo a la carpeta destino
                    if (move_uploaded_file($tmpName, $rutaCompleta)) {
                        // El archivo se movió correctamente, puedes almacenar la información en la base de datos o realizar otras acciones necesarias
                        // Puedes acceder a $rutaCompleta para guardar esta ruta en la base de datos si es necesario
                        $insertaImg = "INSERT INTO `imagenes` (`imageurl`, `Producto_idProducto`) VALUES ('$rutaCompleta', $idProducto)";
                        $resultado = mysqli_query($conexionBD, $insertaImg);
                        if ($resultado) {
                            echo json_encode(["success" => true, "message" => "Imagenes cargadas"]);
                        } else {
                            throw new Exception("No se pudo insertar los datos de imagen ");
                        }
                    } else {
                        throw new Exception("Error al subir el archivo $nombreArchivo.\n");
                    }
                }
            } catch (Exception $e) {
                http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
                echo json_encode(["success" => false, "message" => $e->getMessage()]);
            }
        } else {
            throw new Exception("Error al registrar el producto, valida que los datos ingresados sean correctos");
        }
        // Cerrar la consulta preparada
        mysqli_stmt_close($stmt);
        exit();
    } catch (Exception $e) {
        http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
}
