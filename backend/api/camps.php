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
$campsCollection = $db->getCollection('camps');

switch ($method) {
    case 'GET':
        // Get all camps or specific camp
        if (isset($_GET['id'])) {
            $campId = $_GET['id'];
            $camp = $campsCollection->findOne(['_id' => new MongoDB\BSON\ObjectId($campId)]);
            
            if ($camp) {
                echo json_encode($camp);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Camp not found']);
            }
        } else {
            // Get all camps with filters
            $filter = [];
            
            if (isset($_GET['status'])) {
                $filter['status'] = $_GET['status'];
            }
            
            if (isset($_GET['location'])) {
                $filter['location'] = new MongoDB\BSON\Regex($_GET['location'], 'i');
            }
            
            if (isset($_GET['date'])) {
                $filter['date'] = $_GET['date'];
            }
            
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $skip = ($page - 1) * $limit;
            
            $camps = $campsCollection->find($filter, [
                'limit' => $limit,
                'skip' => $skip,
                'sort' => ['date' => 1]
            ])->toArray();
            
            echo json_encode($camps);
        }
        break;
        
    case 'POST':
        // Create new camp
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        // Validate required fields
        $requiredFields = ['name', 'organizer', 'location', 'date', 'time'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Missing required field: $field"]);
                exit();
            }
        }
        
        // Prepare camp data
        $campData = [
            'name' => $data['name'],
            'organizer' => $data['organizer'],
            'location' => $data['location'],
            'date' => $data['date'],
            'time' => $data['time'],
            'expectedDonors' => $data['expectedDonors'] ?? 100,
            'registeredDonors' => $data['registeredDonors'] ?? 0,
            'bloodGroups' => $data['bloodGroups'] ?? ['All Groups'],
            'description' => $data['description'] ?? '',
            'contact' => $data['contact'] ?? [],
            'status' => 'upcoming',
            'rating' => 0,
            'reviews' => 0,
            'created_at' => new MongoDB\BSON\UTCDateTime(),
            'updated_at' => new MongoDB\BSON\UTCDateTime()
        ];
        
        try {
            $result = $campsCollection->insertOne($campData);
            
            if ($result->getInsertedCount() > 0) {
                $campData['_id'] = $result->getInsertedId();
                http_response_code(201);
                echo json_encode([
                    'message' => 'Camp created successfully',
                    'camp' => $campData
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create camp']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Update camp
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Camp ID required']);
            break;
        }
        
        $campId = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        $updateData = $data;
        $updateData['updated_at'] = new MongoDB\BSON\UTCDateTime();
        
        try {
            $result = $campsCollection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($campId)],
                ['$set' => $updateData]
            );
            
            if ($result->getModifiedCount() > 0) {
                echo json_encode(['message' => 'Camp updated successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Camp not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Delete camp
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Camp ID required']);
            break;
        }
        
        $campId = $_GET['id'];
        
        try {
            $result = $campsCollection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($campId)]);
            
            if ($result->getDeletedCount() > 0) {
                echo json_encode(['message' => 'Camp deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Camp not found']);
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