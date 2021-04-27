const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sivart77',
    database: 'company_DB'
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
})

const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'ADD departments, roles, or employees.',
                'VIEW departments, roles, or employees.',
                'VIEW employees by manager',
                'VIEW budget by department',
                'UPDATE employee role or manager.',
                'DELETE departments, roles, or employees.'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'ADD departments, roles, or employees.':
                    addItems();
                    break;
                case 'VIEW departments, roles, or employees.':
                    viewItems();
                    break;
                case 'VIEW employees by manager':
                    viewManager();
                    break;
                case 'VIEW budget by department':
                    viewBudget();
                    break;
                case 'UPDATE employee role or manager.':
                    updateEmployee();
                    break;
                case 'DELETE departments, roles, or employees.':
                    deleteItems();
                    break;
            }
        })
}

//Add Department, Role, or Employee
const addItems = () => {
    inquirer
        .prompt({
            name: 'item',
            type: 'list',
            message: 'What would you like to add?',
            choices: [
                'Department',
                'Role',
                'Employee'
            ]
        })
        .then((answer) => {
            switch (answer.item) {
                case 'Department':

                    break;
                case 'Role':

                    break;
                case 'Employee':

                    break;
            }
        })
}

//View Department, Role, or Employee
const viewItems = () => {
    inquirer
        .prompt({
            name: 'item',
            type: 'list',
            message: 'What would you like to view?',
            choices: [
                'Departments',
                'Roles',
                'Employees'
            ]
        })
        .then((answer) => {
            switch (answer.item) {
                case 'Departments':  
                const deptQuery = 'SELECT name, id FROM department';
                    connection.query(deptQuery, { department: answer.department }, (err, res) => {
                        if(err) throw err;
                        res.forEach(({ name, id }) => {
                            console.log(
                                `Department Name: ${name} || Department ID: ${id}`
                            );
                        });
                    });
                    break;
                case 'Roles':  
                    const roleQuery = 'SELECT title, id FROM role WHERE ?';
                    connection.query(roleQuery, { department: answer.role }, (err, res) => {
                        res.forEach(({ title, id }) => {
                            console.log(
                                `Role Title: ${title} || Role ID: ${id}`
                            );
                        });
                    });
                    break;
                case 'Employees': 
                    const empQuery = 'SELECT name, id FROM employee WHERE ?';
                    connection.query(empQuery, { department: answer.employee }, (err, res) => {
                        res.forEach(({ first_name, last_name, id }) => {
                            console.log(
                                `Name: ${first_name} ${last_name} || Employee ID: ${id}`
                            );
                        });
                    });
                    break;
            }
        })
}

const viewManager = () => {
    inquirer
        .prompt({
            name: 'employeeID',
            type: 'input',
            message: 'Input the EMPLOYEE ID of the employee whose manager you would like to view:'
        })
        .then((answer) => {

        })
}

const viewBudget = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'Input the department whose budget you would like to view:'
        })
        .then((answer) => {

        })
}

const updateEmployee = () => {
    inquirer
        .prompt({
            name: 'item',
            type: 'list',
            message: 'What would you like to update?',
            choices: [
                'Employee Department',
                'Employee Role'
            ]
        })
        .then((answer) => {

        })
}

const deleteItems = () => {
    inquirer
        .prompt({
            name: 'item',
            type: 'list',
            message: 'What would you like to delete?',
            choices: [
                'Department',
                'Role',
                'Employee'
            ]
        })
        .then((answer) => {

        })
}