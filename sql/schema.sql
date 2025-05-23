CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    date_time DATETIME NOT NULL,
    location VARCHAR(255),
    max_capacity INTEGER DEFAULT 100,
    current_registrations INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Registrations table with user information
CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'confirmed',
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_events_date_time ON events(date_time);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_date_category ON events(date_time, category);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(user_email);
CREATE INDEX IF NOT EXISTS idx_registrations_date ON registrations(registration_date);

-- Trigger to update current_registrations count
CREATE TRIGGER IF NOT EXISTS update_registration_count
    AFTER INSERT ON registrations
    FOR EACH ROW
BEGIN
    UPDATE events 
    SET current_registrations = (
        SELECT COUNT(*) FROM registrations 
        WHERE event_id = NEW.event_id AND status = 'confirmed'
    )
    WHERE id = NEW.event_id;
END;

-- Sample data for development
INSERT OR IGNORE INTO events (id, title, description, category, date_time, location, max_capacity) VALUES
(1, 'React Advanced Patterns Workshop', 'Deep dive into advanced React patterns and performance optimization', 'workshop', '2025-06-15 10:00:00', 'Tech Hub Downtown', 50),
(2, 'AI/ML Meetup: Latest Trends', 'Discussion on latest trends in artificial intelligence and machine learning', 'meetup', '2025-06-20 18:00:00', 'Innovation Center', 100),
(3, 'GraphQL Best Practices Webinar', 'Learn GraphQL best practices from industry experts', 'webinar', '2025-06-25 14:00:00', 'Online', 500),
(4, 'Node.js Performance Tuning', 'Optimize your Node.js applications for better performance', 'workshop', '2025-07-01 09:00:00', 'Code Academy', 30),
(5, 'Startup Pitch Night', 'Local startups presenting their innovative ideas', 'networking', '2025-07-05 19:00:00', 'Business District Hall', 200);