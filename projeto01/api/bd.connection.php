<?php

define('HOSTNAME', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');
define('BD', 'storeOrigamid');

$mysqli = new mysqli(HOSTNAME, USERNAME, PASSWORD, BD);

if ($mysqli->connect_error) {
    die("Falha na conexão: " . $mysqli->connect_error);
};

$query = "SELECT * FROM `tb_site.avaliacoes`";

$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    $i = 0;
    $array = [];
    while ($row = $result->fetch_assoc()) {
        $array[$i] = $row;
        $i++;
    };
    $json = json_encode($array);
    // echo $json;
}

$mysqli->close();

// para ler o post
$_POST = json_decode(file_get_contents("php://input"), true);
echo $_POST['firstName'];


// echo "Conectado";
