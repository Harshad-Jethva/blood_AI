<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config/database.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$donorsCollection = $db->getCollection('donors');

switch ($method) {
    case 'GET':
        // Get all donors or specific donor
        if (isset($_GET['id'])) {
            $donorId = $_GET['id'];
            $donor = $donorsCollection->findOne(['_id' => new MongoDB\BSON\ObjectId($donorId)]);
            
            if ($donor) {
                echo json_encode($donor);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Donor not found']);
            }
        } else {
            // Get all donors with pagination
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $skip = ($page - 1) * $limit;
            
            $donors = $donorsCollection->find([], [
                'limit' => $limit,
                'skip' => $skip,
                'sort' => ['created_at' => -1]
            ])->toArray();
            
            echo json_encode($donors);
        }
        break;
        
    case 'POST':
        // Create new donor
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        // Validate required fields
        $requiredFields = ['firstName', 'lastName', 'email', 'phone', 'bloodGroup'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Missing required field: $field"]);
                exit();
            }
        }
        
        // Check if email already exists
        $existingDonor = $donorsCollection->findOne(['email' => $data['email']]);
        if ($existingDonor) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already registered']);
            break;
        }
        
        // Prepare donor data
        $donorData = [
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'dateOfBirth' => $data['dateOfBirth'] ?? '',
            'bloodGroup' => $data['bloodGroup'],
            'address' => $data['address'] ?? '',
            'city' => $data['city'] ?? '',
            'state' => $data['state'] ?? '',
            'zipCode' => $data['zipCode'] ?? '',
            'emergencyContact' => $data['emergencyContact'] ?? [],
            'medicalHistory' => $data['medicalHistory'] ?? [],
            'preferences' => $data['preferences'] ?? [],
            'status' => 'active',
            'created_at' => new MongoDB\BSON\UTCDateTime(),
            'updated_at' => new MongoDB\BSON\UTCDateTime()
        ];
        
        try {
            $result = $donorsCollection->insertOne($donorData);
            
            if ($result->getInsertedCount() > 0) {
                $donorData['_id'] = $result->getInsertedId();
                http_response_code(201);
                echo json_encode([
                    'message' => 'Donor registered successfully',
                    'donor' => $donorData
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to register donor']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Update donor
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Donor ID required']);
            break;
        }
        
        $donorId = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        $updateData = $data;
        $updateData['updated_at'] = new MongoDB\BSON\UTCDateTime();
        
        try {
            $result = $donorsCollection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($donorId)],
                ['$set' => $updateData]
            );
            
            if ($result->getModifiedCount() > 0) {
                echo json_encode(['message' => 'Donor updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Donor not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Delete donor
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Donor ID required']);
            break;
        }
        
        $donorId = $_GET['id'];
        
        try {
            $result = $donorsCollection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($donorId)]);
            
            if ($result->getDeletedCount() > 0) {
                echo json_encode(['message' => 'Donor deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Donor not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?> 