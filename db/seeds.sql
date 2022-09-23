USE employeeTracker_DB;


INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");



INSERT INTO role (title, salary, department_id)
VALUES ("Floor Sales", 60000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 90000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Seymore", "Butz", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pepe", "Roni", 10, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Pits", 9, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hugh", "Jazz", 5, null);