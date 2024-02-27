INSERT INTO department (name)
VALUES ("Director of Resident Services"), ("Sales Lead"), ("Island Representative"), ("Hospitality"), ("Leadership");

INSERT INTO role (title, salary, department_id)
VALUE ("Director of Resident Services", 25000.00, 2), ("Sales Lead", 600000.00, 3), ("Island Representative", 600000.00, 4), ("Hospitality", 200000.00, 1), ("Leadership", 800000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tom", "Nook", 1, 3), ("Timmy", "Nook", 1, 1), ("Tia", "Cup", 3, 2), ("Tommy", "Nook", 5, 2), ("Wilbur", "Dodo", 5, 2);