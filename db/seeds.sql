USE employeeTracker_DB;

----- Department Seeds -----
INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO department (department_name)
VALUES ("Legal");

----- Role Seeds -----

INSERT INTO role (title, salary, department_id)
VALUES ("Floor Sales", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 90000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("Seymore", "Butz", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("Pepe", "Roni", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Pits", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("Hugh", "Jazz", 5, null);