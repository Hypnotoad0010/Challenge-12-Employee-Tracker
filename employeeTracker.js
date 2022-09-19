//const dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Zero1234",
    database: "employer_trackerDB"
})
//Connects to mysql and db
connection.connect((err) => {
    if (err) throw err;
    startAction();
  });

//Starts function for application

function startAction() {
    inquirer
      .prompt({
        type: "list",
        name: "startAction",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role"
        ]
        })
      .then(function(answer) {
        if (answer.action === "View all Departments") {
          viewDepts();
        }
        else if(answer.action === "View all Roles") {
          viewRoles();
        }
        else if(answer.action === "View all Employees") {
          viewEmps();
        }
        else if(answer.action === "Add Department") {
          addDept();
        }
        else if(answer.action === "Add Role") {
          addRole();
        }
        else if(answer.action === "Add Employee") {
          addEmps();
        }
        else if(answer.action === "Update Employee Role") {
          updateEmpRole();
        }
        else if (answer.action === "EXIT") {
          connection.end();
        }
      });
  }

  function viewDepts() {
    connection.query(
        "SELECT employee.first_name AS FirstName, employee.last_name AS LastName, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function(err, result,) {
        if (err) throw err;
        console.table(result);
        runSearch();
      }
    );
  };

  function viewRoles() {
    connection.query(
        "SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role FROM employee JOIN role ON employee.role_id = role.id;",
    (err, answer) => {
        if (err) throw err;
        console.log("\n");
        console.table(answer);
        start();
        });
    }

  // view employees in console

function viewEmps() {
    connection.query(
        "SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;",
    (err, answer) => {
        if (err) throw err;
        console.log("\n");
        console.table(answer);
        start();
        });
     }

  // add department in sql

function addDept() {
  connection.query(
    "SELECT department.name FROM department", (err, data) => {
      if (err) throw err;
    inquirer
        .prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the Department?"
        }
        ])
        .then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
            name: answer.deptName
            },
            (err) => {
            if (err) throw err;
            console.log("\n The department was added successfully! \n");
            start();
            }
        );
    });
})
}

function addRole() {
    connection.query(
      "SELECT role.title AS Title, role.salary AS Salary FROM role", (err, data) => {
        if (err) throw err;
      inquirer
          .prompt([
          {
              name: "roleTitle",
              type: "input",
              message: "What is the title of the role?"
          },
          {
              name: "roleSalary",
              type: "input",
              message: "What is the salary of the role?"
          }
          ])
          .then((answers) => {
          connection.query(
              "INSERT INTO role SET ?",
              {
              title: answers.roleTitle,
              salary: answers.roleSalary,
              },
              (err) => {
              if (err) throw err;
              console.log("\n The role was added successfully! \n");
  
              start();
              }
          );
      });
  })
  }
  

