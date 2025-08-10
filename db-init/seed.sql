-- seed.sql
USE educourse;

INSERT INTO users (fullname, username, email, password, role, is_verified)
VALUES
('Admin Demo','admin','admin@demo.com','$2b$10$EXAMPLEHASH', 'admin', 1),
('Instructor One','inst1','inst1@demo.com','$2b$10$EXAMPLEHASH', 'instructor', 1),
('Student One','student1','student1@demo.com','$2b$10$EXAMPLEHASH', 'student', 1);

INSERT INTO courses (title, description, topic, instructor_id, price, discount_price, duration)
VALUES
('Belajar React Dasar','Kursus React untuk pemula','react', 2, 100.00, 80.00, '4h'),
('Node.js for Beginners','Intro to Node.js','node', 2, 120.00, NULL,'6h');

INSERT INTO modules (course_id, title, ordinal) VALUES
(1, 'Intro to React', 1),
(1, 'JSX and Components', 2),
(2, 'Intro to Node', 1);

INSERT INTO materials (module_id, title, type, url) VALUES
(1, 'React Overview', 'video', 'https://example.com/video1'),
(2, 'JSX Guide', 'pdf', 'https://example.com/jsx.pdf');
