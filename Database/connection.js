import mysql from 'mysql2';

// connection to the user database
const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: '',      
  database: 'Users', 
});

// Connection to the Points database
const pointsConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Points', 
});

// Connection to the quiz database
const quizConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz', 
});



// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});



export {connection , pointsConnection , quizConnection  };
