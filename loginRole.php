<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, PATCH");
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost:3306";
$usuario = "olympus";
$contrasenia = "wLbLYCRckNzK2yk0";
$nombreBaseDatos = "olympus";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);



//debemos enviar los datos como si fuera un insert

if (isset($_GET["credenciales"])) {
    // echo 'Hola estamos validando tus datos';
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    // $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
    $pass = $data->password;

    $consultaRol = "SELECT Usuarios.idUsuarios, Usuarios.email, Roles.nombre AS rol 
    FROM Usuarios 
    INNER JOIN Usuarios_has_Roles ON Usuarios.idUsuarios = Usuarios_has_Roles.Usuarios_idUsuarios 
    INNER JOIN Roles ON Usuarios_has_Roles.Roles_idRoles = Roles.idRoles 
    WHERE Usuarios.email ='" . $username . "' AND Usuarios.pass ='" . $pass . "'";

    // echo $consultaRol;

    $sqlData = mysqli_query(
        $conexionBD,
        $consultaRol
    );
    if (mysqli_num_rows($sqlData) > 0) {
        $userData = mysqli_fetch_all($sqlData, MYSQLI_ASSOC);
        echo json_encode($userData);
        exit;
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Por favor valida que tus credenciales sean correctas"]);
        exit;
    }
}
