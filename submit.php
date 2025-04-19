<?php 

require_once 'config.php';
require_once 'database.php';
require_once 'helper_discord.php';

loadEnv(__DIR__ . '/.env');

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$household = $_POST['yourself'] ?? null;
$citizenship = $_POST['citizenship'] ?? null;
$requirement = $_POST['age'] ?? null;
$household_income = $_POST['monthly_household'] ?? null;
$ownership_status = $_POST['ownership_status'] ?? null;
$private_property_ownership = $_POST['property_ownership'] ?? null;
$first_time_applicant = $_POST['first_time'] ?? null;
$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? null;
$phone = $_POST['phone_number'] ?? null;

$sql = "INSERT INTO users (household, citizenship, requirement, household_income, ownership_status, private_property_ownership, first_time_applicant, name, email, phone) 
        VALUES (:household, :citizenship, :requirement, :household_income, :ownership_status, :private_property_ownership, :first_time_applicant, :name, :email, :phone)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':household' => $household,
    ':citizenship' => $citizenship,
    ':requirement' => $requirement,
    ':household_income' => $household_income,
    ':ownership_status' => $ownership_status,
    ':private_property_ownership' => $private_property_ownership,
    ':first_time_applicant' => $first_time_applicant,
    ':name' => $name,
    ':email' => $email,
    ':phone' => $phone,
]);

$inserted_id = $pdo->lastInsertId();

$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $inserted_id]);
$user = $stmt->fetch();

if ($user) {
    // sendLeadToDiscord($user);
} else {
    die("Error: User not found after insert");
}


$response = [
    'status' => 'success',
    'message' => 'Form submitted successfully',
    'data' => [],
];

switch (true) {
    case $citizenship === 'No, not Singapore Citizens or Permanent Residents' || 
        $requirement === 'No' || 
        $household_income === 'No' || 
        $private_property_ownership === 'Yes':
        $response['data'] = [
            'result' => 'disqualification',
            'listing' => 'singmap-appeal-mop.php',
        ];
        break;
    case $ownership_status === 'Yes, MOP completed':
        $response['data'] = [
            'result' => 'congratulation',
            'listing' => 'singmap-congratulation.php',
        ];
        break;
    case $ownership_status === 'Yes, still within MOP':
        $response['data'] = [
            'result' => 'mop',
            'listing' => 'singmap-appeal-mop.php',
        ];
        break;
    case $ownership_status === 'No, do not own any HDB':
        $response['data'] = [
            'result' => 'appeal',
            'listing' => 'singmap-appeal-mop.php',
        ];
        break;
    default:
        $response['data'] = [
            'result' => 'disqualification',
            'listing' => 'singmap-appeal-mop.php',
        ];
        break;
}
echo json_encode($response);
exit;

?>