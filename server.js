// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

// Database Connection Configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3001,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Love",
  database: process.env.DB_NAME || "employee_info_db"
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
  startScreen();
});

// Function to start the application
// Function to display the initial menu and handle user choices
async function startScreen() {
    try {
      const { option } = await inquirer.prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      });
  
      switch (option) {
        case "Add department":
          await addDepartment();
          break;
        case "Add role":
          await addRole();
          break;
        case "Add employee":
          await addEmployee();
          break;
        case "View departments":
          await viewDepartment();
          break;
        case "View roles":
          await viewRoles();
          break;
        case "View employees":
          await viewEmployees();
          break;
        case "Update employee role":
          await updateEmployee();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Invalid option. Please select a valid option.");
          startScreen();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Function to add a department
function addDepartment() {
    inquirer.prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"
    }).then(async function(answer) {
      try {
        await insertData("department", ["name"], [answer.deptName]);
        startScreen();
      } catch (error) {
        console.error("Error adding department:", error);
      }
    });
  }
  
  // Function to add a role
  function addRole() {
    inquirer.prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ]).then(async function(answer) {
      try {
        await insertData("role", ["title", "salary", "department_id"], [answer.roleName, answer.salaryTotal, answer.deptID]);
        startScreen();
      } catch (error) {
        console.error("Error adding role:", error);
      }
    });
  }
  
  // Function to add an employee
  function addEmployee() {
    inquirer.prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ]).then(async function(answer) {
      try {
        await insertData("employee", ["first_name", "last_name", "role_id", "manager_id"], [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID]);
        startScreen();
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    });
  }
  
  // Function to insert data into the database
  async function insertData(table, columns, values) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (?)`, [values], function(err, res) {
        if (err) {
          reject(err);
        } else {
          console.table(res);
          resolve();
        }
      });
    });
  }