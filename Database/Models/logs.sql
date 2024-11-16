create Database Logs ; 
use Logs ; 

CREATE TABLE user_logs (
    userID VARCHAR(255) NOT NULL,  -- Use VARCHAR instead of TEXT
    messageID INT NOT NULL,
    PRIMARY KEY (userID, messageID)
);

show tables ; 
