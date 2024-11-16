CREATE DATABASE Users;
USE Users;

SET SQL_SAFE_UPDATES = 0;

CREATE TABLE user (
    userId bigint PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    topicSelected VARCHAR(255) NOT NULL,
    totalScore INT DEFAULT 0
);



select * from user 	; 

	