<?php

// Incluye el archivo de conexión (dentro del server el archivo productos.php 
//debe salir dos carpetas afuera para llegar a la carpeta conPrincipal)
require('../../conPrincipal/index.php');

$idProducto = null;

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
            // Obtener el idProducto después de ejecutar la consulta
            $idProducto = mysqli_insert_id($conexionBD);
            mysqli_stmt_close($stmt);
        } else {
            throw new Exception("Error al ejecutar la inserción de producto: " . mysqli_error($conexionBD));
        }

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
        } else {
            mysqli_stmt_bind_param($stmtCaracteristicas, "isissssss", $idProducto, $unidadMedicion, $cantidadUnidades, $talla, $color, $longitud, $sabor, $genero, $marca);
            $resultCaracteristicas = mysqli_stmt_execute($stmtCaracteristicas);

            if (!$resultCaracteristicas) {
                throw new Exception("Error al insertar caracteristicas: " . mysqli_error($conexionBD));
            }
            echo json_encode(["success" => true, "message" => "Producto creado", "idProducto" => $idProducto]);
            mysqli_stmt_close($stmtCaracteristicas);
        }
    } catch (Exception $e) {
        http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
}


if (isset($_GET["subirImagenes"])) {

    try {
        //validar imagenes
        if (isset($_FILES['files'])) {

            // Obtén el idProducto desde la URL
            $idProducto = $_GET["idProducto"];
            
            if (!is_null($idProducto) && $idProducto !== "") {

                $allowedFormats = ['jpg', 'jpeg', 'png'];
                $imagenes = count($_FILES['files']['name']);

                for ($i = 0; $i < $imagenes; $i++) {

                    $fileType = pathinfo($_FILES['files']['name'][$i], PATHINFO_EXTENSION);
                    $tmpFilePath = $_FILES['files']['tmp_name'][$i];
                    $newFileName = __DIR__ . '/imagenes/' . $_FILES['files']['name'][$i];

                    if (!in_array($fileType, $allowedFormats)) {
                        throw new Exception("Formato de archivo no permitido.");
                    } else {
                        $insertaImg = "INSERT INTO `imagenes` (`imageurl`, `Producto_idProducto`) VALUES (?,?)";
                        $stmtImagenes = mysqli_prepare($conexionBD, $insertaImg);
                        if (!$stmtImagenes) {
                            throw new Exception("Error al preparar la insercion imagenes: " . mysqli_error($conexionBD));
                        } else {
                            //obtener el idproducto de la url
                            mysqli_stmt_bind_param($stmtImagenes, "si", $newFileName, $idProducto);
                            $resultImagenes = mysqli_stmt_execute($stmtImagenes);
                            if (!$resultImagenes) {
                                throw new Exception("Error al insertar info de iamgenes: " . mysqli_error($conexionBD));
                            } else {
                                try {
                                    if (!copy($tmpFilePath, $newFileName)) {
                                        throw new Exception("Error al copiar el archivo.");
                                    }
                                } catch (Exception $e) {
                                    http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
                                    echo json_encode(["success" => false, "message" => $e->getMessage()]);
                                }
                            }
                        }
                    }
                }
                echo json_encode(["success" => true, "message" => "Imagenes cargadas"]);
                mysqli_stmt_close($stmtImagenes);
            } else {
                throw new Exception("idProducto is null or empty");
            }
        } else {
            // Manejo de error si no se reciben los datos esperados
            throw new Exception("No hay imagenes:");
        }
    } catch (Exception $e) {
        http_response_code(500);  // Código de estado HTTP para "Error interno del servidor"
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
}
