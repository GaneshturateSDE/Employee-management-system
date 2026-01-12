CREATE DATABASE ems;
USE ems;

-- Employees Table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'EMPLOYEE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaves Table
CREATE TABLE leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  reason VARCHAR(255) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  FOREIGN KEY (employee_id)
    REFERENCES employees(id)
    ON DELETE CASCADE
);

-- Attendance Table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  UNIQUE(employee_id, attendance_date),
  FOREIGN KEY (employee_id)
    REFERENCES employees(id)
    ON DELETE CASCADE
);

-- HR User
INSERT INTO employees (name, email, username, password, role)
VALUES (
  'Admin HR',
  'hr@company.com',
  'admin',
  '$2a$10$yY3m1K8yZxYxQkU6hKxUeO1g0h3ZK6y9Z0F6Qv8ZlK0Y0U1m6',
  'HR'
);

-- Employees
INSERT INTO employees (name, email, username, password, role)
VALUES
(
  'Rahul Sharma',
  'rahul@company.com',
  'rahul',
  '$2a$10$yY3m1K8yZxYxQkU6hKxUeO1g0h3ZK6y9Z0F6Qv8ZlK0Y0U1m6',
  'EMPLOYEE'
),
(
  'Anita Verma',
  'anita@company.com',
  'anita',
  '$2a$10$yY3m1K8yZxYxQkU6hKxUeO1g0h3ZK6y9Z0F6Qv8ZlK0Y0U1m6',
  'EMPLOYEE'
),
(
  'Suresh Patil',
  'suresh@company.com',
  'suresh',
  '$2a$10$yY3m1K8yZxYxQkU6hKxUeO1g0h3ZK6y9Z0F6Qv8ZlK0Y0U1m6',
  'EMPLOYEE'
);

INSERT INTO leaves (employee_id, reason, from_date, to_date, status)
VALUES
(2, 'Medical Leave', '2026-01-10', '2026-01-12', 'Pending'),
(3, 'Family Function', '2026-01-15', '2026-01-16', 'Approved'),
(4, 'Personal Work', '2026-01-20', '2026-01-20', 'Rejected');

INSERT INTO attendance (employee_id, attendance_date, status)
VALUES
(2, '2026-01-08', 'Present'),
(3, '2026-01-08', 'Absent'),
(4, '2026-01-08', 'Present'),

(2, '2026-01-09', 'Absent'),
(3, '2026-01-09', 'Present'),
(4, '2026-01-09', 'Present');
