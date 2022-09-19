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
// Functions below allow you to view departments, roles, and employees in the console
  function viewDepts() {
    connection.query(
        "SELECT employee.first_name AS FirstName, employee.last_name AS LastName, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function(err, result,) {
        if (err) throw err;
        console.table(result);
        start();
  });
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

//Allows you to add Department
function addDept() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "newDept"
      })
      .then(function (res) {
        const newDepartment = res.newDept;
        const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        });
      });
  }

//Allows you to add role
function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's title",
          name: "roleTitle"
        },
        {
          type: "input",
          message: "Enter the employee's salary",
          name: "roleSalary"
        },
        {
          type: "input",
          message: "Enter the employee's department ID",
          name: "roleDept"
        }
      ])
      .then((answers) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
            title: answers.roleTitle,
            salary: answers.roleSalary,
            id: answers.roleDept
            },
            (err) => {
            if (err) throw err;
            console.log("\n The role was added successfully! \n");

            start();
            }
        );
      });
  }

  currentRoles = [];
  currentManagers = [];

//Allows you to add Employee
function addEmps() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name",
          name: "firstName"
        },
        {
          type: "input",
          message: "Enter the employee's last name",
          name: "lastName"
        },
        {
          type: "input",
          message: "Enter the employee's role ID",
          name: "addEmployRole"
        },
        {
          type: "input",
          message: "Enter the employee's manager ID",
          name: "addEmployMan"
        }
      ])
      .then((answers) => {
        const roleID = empRole().indexOf(answers.role) + 1
        const managerID = empManager().indexOf(answers.manager) + 1
        connection.query("INSERT INTO employee SET ?", 
      {
          first_name: answers.firstName,
          last_name: answers.lastName,
          manager_id: managerID,
          role_id: roleID
      }, (err) => {
        if (err) throw err;
        console.table(answers)
        start();
      })
    });
  }

//Allows you to update
function updateEmpRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmploy"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then (answers => {
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: empData.find(function(data) {
                        return data.title === answers.empRole
                    })
                },
                {
                    id: roleData.find(function(data) {
                        return `${data.first_name} ${data.last_name}` === answers.empName
                    })
                }
            ],
            function(err) {
                if (err) throw err;
                console.log("\n Employee role updated! \n");
                start();
            })
    });
}
            
      



  

