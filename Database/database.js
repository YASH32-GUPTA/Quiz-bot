import mysql from 'mysql2/promise';
import {connection , pointsConnection, quizConnection } from "./connection.js";

// Connection to the Logs database
const logsConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Logs', 
});

// Function to insert or update user data in the 'user' table

const insertOrUpdateUserData =  (userId, firstName, lastName, topicSelected, totalScore = 0 ) => {
    const checkUserQuery = 'SELECT * FROM user WHERE userId = ?';
    
    const updateUserQuery = `
        UPDATE user 
        SET name = ?, topicSelected = ?, totalScore = ?
        WHERE userId = ?
    `;
    
    const insertUserQuery = `
        INSERT INTO user (userId, name, topicSelected, totalScore) 
        VALUES (?, ?, ?, ?)
    `;

    // check user exists
    connection.query(checkUserQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return;
        }
        if (results.length > 0) {
            connection.query(updateUserQuery, [`${firstName} ${lastName}`, topicSelected, totalScore, userId], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating user data:', updateErr);
                } else {
                    console.log(`Updated user data for ${firstName} ${lastName} with userId: ${userId}`);
                }
            });
        } else {
            connection.query(insertUserQuery, [userId, `${firstName} ${lastName}`, topicSelected, totalScore], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new user data:', insertErr);
                } else {
                    console.log(`Inserted new user data for ${firstName} ${lastName} with userId: ${userId}`);
                }
            });
        }
    });
};


// Points Process

// Creation of point table for the new user  
function createPointsTable(userId) {
    const createQuery = `CREATE TABLE IF NOT EXISTS user_${userId} (
        idx INT PRIMARY KEY,
        status BOOLEAN DEFAULT NULL
    );`;

    pointsConnection.query(createQuery, (err) => {
        if (err) {
            console.error(`Error creating table for user ${userId}:`, err);
            return;
        }
        console.log(`Table user_${userId} created.`);

        const initializeQuery = `
            INSERT INTO user_${userId} (idx, status) 
            VALUES (0, NULL), (1, NULL), (2, NULL), (3, NULL), (4, NULL), 
                   (5, NULL), (6, NULL), (7, NULL), (8, NULL), (9, NULL)
            ON DUPLICATE KEY UPDATE status = NULL;
        `;
        pointsConnection.query(initializeQuery, (initErr) => {
            if (initErr) {
                console.error(`Error initializing table for user ${userId}:`, initErr);
            } else {
                console.log(`Table user_${userId} initialized with idx 0-9 set to NULL.`);
            }
        });
    });
}

// process the each question status 
async function updateUserAnswerStatus(userId, questionIndex, status) {
    const tableName = `user_${userId}`; 

    const updateQuery = `
        UPDATE ${tableName}
        SET status = ?
        WHERE idx = ?
    `;
    
    const updateValues = [status ? 1 : 0, questionIndex]; 

    return new Promise((resolve, reject) => {
        pointsConnection.query(updateQuery, updateValues, (err, results) => {
            if (err) {
                console.error('Error updating answer status:', err);
                reject(err); // Reject 
            } else {
                console.log(`Updated question index ${questionIndex} for user ${userId} with status: ${status ? 'True' : 'False'}`);
                resolve(results); // Resolve 
            }
        });
    });
}


// Reset Points Table Process
function resetPointsTable(userId) {
    const query = `UPDATE user_${userId} SET status = NULL;`;
    pointsConnection.query(query, (err) => {
        if (err) {
            console.error(`Error resetting table for user ${userId}:`, err);
        } else {
            console.log(`Table user_${userId} reset to default status.`);
        }
    });
}


// Function to fetch the paragraph for the selected topic
async function fetchParagraphByTopic(topicSelected) { 
    let response = { paragraph: '', topicID: '' };

    const query = `SELECT paragraph, topicID FROM Paragraphs WHERE topic = '${topicSelected}'`;
    const result = await executeQuery(query);
    
    if (result.length === 0) {
        throw new Error("No paragraphs found for the selected topic.");
    }

    // Randomly select one paragraph
    const randomIndex = Math.floor(Math.random() * result.length);
    const selectedParagraph = result[randomIndex];

    response.paragraph = selectedParagraph.paragraph;
    response.topicID = selectedParagraph.topicID;

    return response;
}


// Helper function 
async function executeQuery(query) {
    return new Promise((resolve, reject) => {
        quizConnection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// display total score 
async function calculateTotalScore(userId) {
    const tableName = `user_${userId}`; 

    const query = `
        SELECT COUNT(*) AS score
        FROM ${tableName}
        WHERE status = 1
    `;
    
    return new Promise((resolve, reject) => {
        pointsConnection.query(query, (err, results) => {
            if (err) {
                console.error('Error calculating total score:', err);
                reject(err); // Reject 
            } else {
                const score = results[0].score; 
                console.log(`Total score: ${score}`);
                resolve(score); // Resolve 
            }
        });
    });
}


// Maintain Logs 

// Insert Logs 
async function insertLog(userID, messageID) {
    const query = `INSERT INTO user_logs (userID, messageID) VALUES (?, ?)`;
    try {
        await logsConnection.execute(query, [userID, messageID]);
        console.log(`Log for user ${userID} with messageID ${messageID} inserted.`);
    } catch (err) {
        console.error("Error inserting log:", err);
    }
}

// Clearing Logs of the user 
async function clearLogs(ctx) {
    const userId = ctx.from.id;
    const tableName = `user_logs`;  

    try {
        const query = `SELECT messageID FROM ${tableName} WHERE userID = ?`;

        const [rows] = await logsConnection.execute(query, [userId]);

        console.log('db logs:', rows);  

        if (rows && Array.isArray(rows) && rows.length > 0) {
            for (const log of rows) {
                const messageId = log.messageID;  
                try {
                    await ctx.deleteMessage(messageId);  
                    console.log(`Message with ID ${messageId} deleted`);
                } catch (error) {
                    console.error("Error deleting message:", error);  
                }
            }

            const deleteQuery = `DELETE FROM ${tableName} WHERE userID = ?`;
            await logsConnection.execute(deleteQuery, [userId]);  

            console.log(`Logs cleared and messages deleted for user ${userId}`);
        } else {
            console.error('No logs found for user or logs are not an array');
        }

    } catch (err) {
        console.error("Error clearing chat and logs:", err);
    }   
}



export { insertOrUpdateUserData , createPointsTable , resetPointsTable , fetchParagraphByTopic , executeQuery , updateUserAnswerStatus , calculateTotalScore  , insertLog , clearLogs } ;