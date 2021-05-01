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
                'ADD departments, roles, or employees',
                'VIEW departments, roles, or employees',
                "UPDATE an employee's role or manager",
                'DELETE departments, roles, or employees'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'ADD departments, roles, or employees':
                    addItems();
                    break;
                case 'VIEW departments, roles, or employees':
                    viewItems();
                    break;
                case "UPDATE an employee's role or manager":
                    updateEmployee();
                    break;
                case 'DELETE departments, roles, or employees':
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
                    addDepartment();
                    break;
                case 'Role':
                    addRole();
                    break;
                case 'Employee':
                    addEmployee();
                    break;
            }
        })
}

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'deptName',
            type: 'input',
            message: 'Input the name of the department you want to add:'
        })
        .then(function (answer) {
            connection.query('INSERT INTO department (name) VALUES (?)', [answer.deptName], (err, res) => {
                if (err) throw err;
                console.log(`Your department has been added!`)
                runSearch();
            })
        })
}

const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'roleName',
                    type: 'input',
                    message: 'Input the name of the role you want to add:'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Input the salary for the role:'
                },
                {
                    name: 'department',
                    type: 'list',
                    message: 'Select the department for the role:',
                    choices: function () {
                        let deptArray = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArray.push(res[i].name);
                        }
                        return deptArray;
                    }
                }])
            .then(function (answer) {
                let deptId;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].name == answer.department) {
                        deptId = res[j].id;
                    }
                }
                connection.query('INSERT INTO role SET ?',
                    {
                        title: answer.roleName,
                        salary: answer.salary,
                        department_id: deptId
                    }, function (err, res) {
                        if (err) throw err;
                        console.log('Your role has been added!')
                    });
                runSearch();
            })
    })
}

const addEmployee = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: "Input the employee's first name:"
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: "Input the employee's last name:"
                },
                {
                    name: 'managerId',
                    type: 'input',
                    message: "If the employee has a manager, input the manager's ID:"
                },
                {
                    name: 'role',
                    type: 'list',
                    message: "Select the employee's role:",
                    choices: function () {
                        let roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    }
                }
            ])
            .then(function (answer) {
                let roleId;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].title == answer.role) {
                        roleId = res[j].id;
                    }
                }
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        manager_id: answer.managerId,
                        role_id: roleId
                    }, function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!')
                    });
                runSearch();
            })
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
                    listAllDepartments();
                    break;
                case 'Roles':
                    listAllRoles();
                    break;
                case 'Employees':
                    listAllEmployees();
                    break;
            }
        })
}

const listAllDepartments = () => {
    let empQuery = 'SELECT * FROM department';
    connection.query(empQuery, (err, res) => {
        if (err) throw err;
        console.log('DEPARTMENTS:');
        console.table(res);
    });
    runSearch();
}

const listAllRoles = () => {
    let empQuery = 'SELECT * FROM role';
    connection.query(empQuery, (err, res) => {
        if (err) throw err;
        console.log('ROLES:');
        console.table(res);
    });
    runSearch();
}

const listAllEmployees = () => {
    let empQuery = 'SELECT * FROM employee';
    connection.query(empQuery, (err, res) => {
        if (err) throw err;
        console.log('EMPLOYEES:');
        console.table(res);
    });
    runSearch();

}

//UPDATE EMPLOYEE ROLE OR DEPARTMENT

const updateEmployee = () => {
    inquirer
        .prompt({
            name: 'item',
            type: 'list',
            message: 'What would you like to update?',
            choices: [
                'Employee Manager',
                'Employee Role'
            ]
        })
        .then((answer) => {
            switch (answer.item) {
                case 'Employee Manger':
                    updateEmpManager();
                    break;
                case 'Employee Role':
                    updateEmpRole();
                    break;
            }

        })
}

const updateEmpRole = () => {
    listAllEmployees();
    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'input',
                message: 'Input the employee ID you would like to update:'
            },
            {
                name: 'role',
                type: 'input',
                message: "Input the employee's new role ID:"
            }
        ])
        .then(function (answer) {
            connection.query('UPDATE employee SET role_id=? WHERE id=?',
                [answer.role, answer.employee],
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated!')
                }
            )
            runSearch();
        })
}

const updateEmpManager = () => {
    listAllEmployees();
    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'input',
                message: 'Input the employee ID you would like to update:'
            },
            {
                name: 'manager',
                type: 'input',
                message: "Input the employee's new manager ID:"
            }
        ])
        .then(function (answer) {
            connection.query('UPDATE employee SET manager_id=? WHERE id=?',
                [answer.manager, answer.employee],
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee manager updated!')
                }
            )
            runSearch();
        })
}

//DELETE employees, roles, or departments
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
            switch (answer.item) {
                case 'Department':
                    deleteDepartment();
                    break;
                case 'Role':
                    deleteRole();
                    break;
                case 'Employee':
                    deleteEmployee();
                    break;
            }
        })
}

const deleteDepartment = () => {
    listAllDepartments();
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'Input the ID of the department to delete:'
        })
        .then(function(answer){
            connection.query('DELETE FROM department WHERE id=?',
                answer.department,
                (err, res) => {
                    if (err) throw err;
                    console.log('Department deleted!')
                }
            )
            runSearch();
        })
}

const deleteRole = () => {
    listAllRoles();
    inquirer
        .prompt({
            name: 'role',
            type: 'input',
            message: 'Input the ID of the role to delete:'
        })
        .then(function(answer){
            connection.query('DELETE FROM role WHERE id=?',
                answer.role,
                (err, res) => {
                    if (err) throw err;
                    console.log('Role deleted!')
                }
            )
            runSearch();
        })
}

const deleteEmployee = () => {
    listAllEmployees();
    inquirer
        .prompt({
            name: 'employee',
            type: 'input',
            message: 'Input the ID of the employee to delete:'
        })
        .then(function(answer){
            connection.query('DELETE FROM employee WHERE id=?',
                answer.employee,
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee deleted!')
                }
            )
            runSearch();
        })
}