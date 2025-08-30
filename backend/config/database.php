<?php
require_once __DIR__ . '/../vendor/autoload.php';

use MongoDB\Client;

class Database {
    private $client;
    private $database;
    
    public function __construct() {
        try {
            // MongoDB connection string
            $connectionString = "mongodb://localhost:27017";
            
            // Create MongoDB client
            $this->client = new Client($connectionString);
            
            // Select database
            $this->database = $this->client->selectDatabase('blood_donation_system');
            
        } catch (Exception $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
    
    public function getCollection($collectionName) {
        return $this->database->selectCollection($collectionName);
    }
    
    public function getDatabase() {
        return $this->database;
    }
    
    public function getClient() {
        return $this->client;
    }
}

// Create database instance
$db = new Database();
?> 