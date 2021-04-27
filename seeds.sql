USE company_DB;

INSERT INTO department (id, name)
VALUES (1, 'Accounting');

INSERT INTO department (id, name)
VALUES (2, 'Sales');

INSERT INTO department (id, name)
VALUES (3, 'Operations');

INSERT INTO department (id, name)
VALUES (4, 'IT');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'CFO', 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Payables Clerk', 45000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Outside Sales', 30000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Inside Sales', 30000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Manager', 70000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'Senior Developer', 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Junior Developer', 45000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Network Administator', 60000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Help Desk', 35000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Adrian', 'Reid', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Jason', 'King', 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Jan', 'Davies', 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Sally', 'Miller', 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Lauren', 'Miller', 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Wanda', 'Avery', 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Julian', 'Dyer', 5, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'Andrea', 'Pullman', 6, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Rebecca', 'Tucker', 6, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Rose', 'Churchill', 7, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, 'Alison', 'Hunter', 7, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, 'Rebecca', 'Fraser', 7, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, 'Luke', 'Lee', 8, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (14, 'Sean', 'Dyer', 9, 13);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (15, 'Owen', 'Hodges', 9, 13);