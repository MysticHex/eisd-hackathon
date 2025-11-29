CREATE DATABASE IF NOT EXISTS myapp;
USE myapp;

-- Table: ocr_documents
CREATE TABLE IF NOT EXISTS ocr_documents (
    id CHAR(36) NOT NULL PRIMARY KEY,
    file_key VARCHAR(255) NOT NULL,
    uploader_id CHAR(36),
    status ENUM('pending', 'processed', 'verified', 'failed') DEFAULT 'pending',
    raw_ocr_text LONGTEXT,
    parsed_json LONGTEXT,
    confidences_json LONGTEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: tics_events
CREATE TABLE IF NOT EXISTS tics_events (
    id CHAR(36) NOT NULL PRIMARY KEY,
    station_id VARCHAR(255) NOT NULL,
    unit_id VARCHAR(255) NOT NULL,
    event_type ENUM('START', 'STOP', 'ERROR') NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    metadata LONGTEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: shipments
CREATE TABLE IF NOT EXISTS shipments (
    id CHAR(36) NOT NULL PRIMARY KEY,
    batch_no VARCHAR(255) NOT NULL,
    supplier_name VARCHAR(255),
    status ENUM('MATCHED', 'MISMATCH', 'PENDING') DEFAULT 'PENDING',
    items_json JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dummy Data for ocr_documents
INSERT INTO ocr_documents (id, file_key, status, raw_ocr_text, parsed_json, created_at, updated_at) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'uploads/doc1.pdf', 'processed', 'Sample OCR Text', '{"key": "value"}', NOW(), NOW()),
('123e4567-e89b-12d3-a456-426614174001', 'uploads/doc2.png', 'pending', NULL, NULL, NOW(), NOW());

-- Dummy Data for tics_events
INSERT INTO tics_events (id, station_id, unit_id, event_type, timestamp, metadata, created_at, updated_at) VALUES
('123e4567-e89b-12d3-a456-426614174002', 'STATION-01', 'UNIT-101', 'START', NOW(), '{"temp": 25}', NOW(), NOW()),
('123e4567-e89b-12d3-a456-426614174003', 'STATION-01', 'UNIT-101', 'STOP', NOW(), '{"temp": 28}', NOW(), NOW());

-- Dummy Data for shipments
INSERT INTO shipments (id, batch_no, supplier_name, status, items_json, created_at, updated_at) VALUES
('123e4567-e89b-12d3-a456-426614174004', 'BATCH-001', 'Supplier A', 'PENDING', '[{"item": "A", "qty": 10}]', NOW(), NOW());
