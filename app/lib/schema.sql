CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    comment TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);