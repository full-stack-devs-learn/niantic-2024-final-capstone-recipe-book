USE sys;

# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL                                           #
# Project name:          Recipe Book                                     #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS recipe_book;

CREATE DATABASE IF NOT EXISTS recipe_book;

USE recipe_book;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #

CREATE TABLE users (
                       user_id INT NOT NULL AUTO_INCREMENT,
                       username VARCHAR(50) NOT NULL,
                       hashed_password VARCHAR(255) NOT NULL,
                       role VARCHAR(50) NOT NULL,
                       PRIMARY KEY (user_id)
);

CREATE TABLE custom_recipes (
						custom_id INT NOT NULL AUTO_INCREMENT,
                        user_id INT NOT NULL,
                        title VARCHAR(100) NOT NULL,
                        image VARCHAR(500),
                        instructions LONGTEXT,
                        ingredients LONGTEXT,
                        PRIMARY KEY (custom_id),
                        FOREIGN KEY (user_id) REFERENCES users(user_id)
);   

CREATE TABLE recipes_list (
						recipe_id INT NOT NULL AUTO_INCREMENT,
                        user_id INT NOT NULL,
                        is_custom BOOLEAN NOT NULL,
                        custom_id INT,
                        api_id INT,
                        PRIMARY KEY (recipe_id),
                        FOREIGN KEY(user_id) REFERENCES users(user_id),
                        FOREIGN KEY(custom_id) REFERENCES custom_recipes(custom_id)
				);                     

/*  INSERT Users  */
/* Users and Passwords
username	password
--------	--------
user		password
admin		password
gandalf		password
frodo		password
samwise		password
gollum		password

 are: password */
INSERT INTO users (username, hashed_password, role)
VALUES  ('user','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','ROLE_USER'),
('admin','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('gandalf','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
('frodo','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('samwise','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_HOBBIT'),
('gollum','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');

INSERT INTO custom_recipes (user_id, title, image, instructions, ingredients)
VALUES (1, 'Recipe Title', 'https://img.spoonacular.com/recipes/716429-556x370.jpg', '1. Cook', 'eggs');

INSERT INTO recipes_list (user_id, is_custom, custom_id, api_id)
VALUES (1, True, 1, NULL)

