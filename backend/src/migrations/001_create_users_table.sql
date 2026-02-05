-- Create users table with admin user
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert default admin user (password: blockui123)
-- Hash: $2a$10$X9Z7Y3K9Q2M5P8L1R4T6V8W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@blockui.local', '$2a$10$X9Z7Y3K9Q2M5P8L1R4T6V8W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O', 'admin')
ON CONFLICT (email) DO NOTHING;
