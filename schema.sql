-- Recycling Production Line Manager Selection System Schema

-- Create the database (if needed, though this schema is table-focused)
-- CREATE DATABASE IF NOT EXISTS recycling_manager_db;
-- USE recycling_manager_db;

-- 1. Candidates Table
-- Stores basic information about each candidate.
CREATE TABLE IF NOT EXISTS candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL,
    skills TEXT NOT NULL, -- Stored as a comma-separated string or JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Evaluations Table
-- Stores AI-generated scores for each candidate.
CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_management_score INT CHECK (crisis_management_score BETWEEN 0 AND 10),
    sustainability_score INT CHECK (sustainability_score BETWEEN 0 AND 10),
    team_motivation_score INT CHECK (team_motivation_score BETWEEN 0 AND 10),
    comments TEXT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- 3. Rankings Table
-- Stores the calculated total score and rank for candidates.
CREATE TABLE IF NOT EXISTS rankings (
    candidate_id INT PRIMARY KEY,
    total_score INT NOT NULL, -- comprehensive score based on evaluations
    current_rank INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_evaluations_candidate_id ON evaluations(candidate_id);
CREATE INDEX idx_rankings_total_score ON rankings(total_score DESC);
