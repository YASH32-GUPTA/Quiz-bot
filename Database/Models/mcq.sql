use quiz ;  

CREATE INDEX idx_topicID ON Paragraphs (topicID);

CREATE TABLE IF NOT EXISTS MCQ (
    topicID INT NOT NULL,
    quesIdx INT NOT NULL,
    question TEXT NOT NULL,  
    op1 VARCHAR(255) NOT NULL,
    op2 VARCHAR(255) NOT NULL,
    op3 VARCHAR(255) NOT NULL,
    op4 VARCHAR(255) NOT NULL,
    CorrectAns VARCHAR(255) NOT NULL,
    PRIMARY KEY (topicID, quesIdx),
    FOREIGN KEY (topicID) REFERENCES Paragraphs(topicID)
);

select * from MCQ ; 

INSERT INTO MCQ (topicID, quesIdx, question, op1, op2, op3, op4, CorrectAns) 
VALUES
(1, 0, 'What is JavaScript primarily used for?', 'Server-side programming', 'Database management', 'Web page interactivity', 'Graphic design', 'Web page interactivity'),
(1, 1, 'Who created JavaScript?', 'Microsoft', 'Google', 'Netscape', 'Oracle', 'Netscape'),
(1, 2, 'Which of the following is a JavaScript runtime environment?', 'Node.js', 'Django', 'Flask', 'React', 'Node.js'),
(1, 3, 'Which of these is NOT a JavaScript framework?', 'Angular', 'React', 'Vue.js', 'jQuery', 'jQuery'),
(1, 4, 'What type of function is used to handle events in the DOM in JavaScript?', 'Event handler functions', 'Callback functions', 'Constructor functions', 'Anonymous functions', 'Event handler functions'),
(1, 5, 'Which of the following is a feature of JavaScript?', 'Static typing', 'Multi-threading', 'Dynamic typing', 'None of the above', 'Dynamic typing'),
(1, 6, 'Which method is used to add a new element at the end of an array in JavaScript?', 'pop()', 'shift()', 'push()', 'unshift()', 'push()'),
(1, 7, 'In JavaScript, what does the `this` keyword refer to in an object method?', 'The global object', 'The function being called', 'The object that the method is a property of', 'None of the above', 'The object that the method is a property of'),
(1, 8, 'Which JavaScript keyword is used to declare a variable that cannot be reassigned?', 'var', 'let', 'const', 'static', 'const'),
(1, 9, 'What is the output of the following JavaScript code: `console.log(typeof null);`?', 'object', 'null', 'undefined', 'error', 'object');


INSERT INTO MCQ (topicID, quesIdx, question, op1, op2, op3, op4, CorrectAns) 
VALUES
(2, 0, 'What is the age of the universe?', '10 billion years', '13.8 billion years', '20 billion years', '4.5 billion years', '13.8 billion years'),
(2, 1, 'What is the name of our galaxy?', 'Andromeda', 'Milky Way', 'Triangulum', 'Whirlpool', 'Milky Way'),
(2, 2, 'What event marked the beginning of the universe?', 'Big Bang', 'Solar Eclipse', 'Earth’s Formation', 'First Star Formation', 'Big Bang'),
(2, 3, 'What is dark matter?', 'Matter that cannot be seen but is believed to exert gravitational effects', 'Matter that is visible but very far away', 'A form of energy', 'A type of black hole', 'Matter that cannot be seen but is believed to exert gravitational effects'),
(2, 4, 'What is the largest known galaxy?', 'Andromeda', 'Messier 87', 'IC 1101', 'Sombrero Galaxy', 'IC 1101'),
(2, 5, 'How many planets are in our solar system?', '7', '8', '9', '10', '8'),
(2, 6, 'Which planet is known as the "Red Planet"?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Mars'),
(2, 7, 'What is a black hole?', 'A massive object with strong gravitational pull that not even light can escape', 'A star that exploded', 'A vacuum in space', 'A dark area in the Milky Way', 'A massive object with strong gravitational pull that not even light can escape'),
(2, 8, 'What is the closest star to Earth?', 'Proxima Centauri', 'Alpha Centauri A', 'Sirius A', 'Betelgeuse', 'Proxima Centauri'),
(2, 9, 'What is the observable universe\'s radius?', '100 million light-years', '46.5 billion light-years', '13.8 billion light-years', '500 million light-years', '46.5 billion light-years');


INSERT INTO MCQ (topicID, quesIdx, question, op1, op2, op3, op4, CorrectAns) 
VALUES
(3, 0, 'What is the chemical symbol for water?', 'O2', 'H2O', 'CO2', 'NaCl', 'H2O'),
(3, 1, 'Which planet is closest to the Sun?', 'Earth', 'Venus', 'Mars', 'Mercury', 'Mercury'),
(3, 2, 'What is the powerhouse of the cell?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast', 'Mitochondria'),
(3, 3, 'What is the most abundant gas in Earth’s atmosphere?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium', 'Nitrogen'),
(3, 4, 'Which element is most abundant in the Earth’s crust?', 'Oxygen', 'Silicon', 'Aluminum', 'Iron', 'Oxygen'),
(3, 5, 'What is the process by which plants make their own food?', 'Respiration', 'Photosynthesis', 'Transpiration', 'Fermentation', 'Photosynthesis'),
(3, 6, 'Which gas do plants absorb from the atmosphere for photosynthesis?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 'Carbon Dioxide'),
(3, 7, 'What is the chemical formula for methane?', 'CH4', 'C2H6', 'CO2', 'C6H12O6', 'CH4'),
(3, 8, 'What type of bond involves the sharing of electron pairs between atoms?', 'Ionic bond', 'Hydrogen bond', 'Covalent bond', 'Metallic bond', 'Covalent bond'),
(3, 9, 'What is the unit of electrical resistance?', 'Volt', 'Ampere', 'Ohm', 'Watt', 'Ohm');


INSERT INTO MCQ (topicID, quesIdx, question, op1, op2, op3, op4, CorrectAns) 
VALUES
(4, 0, 'Who was the first President of the United States?', 'Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams', 'George Washington'),
(4, 1, 'In what year did the French Revolution begin?', '1776', '1789', '1799', '1812', '1789'),
(4, 2, 'Who was the main author of the Declaration of Independence?', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams', 'James Madison', 'Thomas Jefferson'),
(4, 3, 'What was the first country to grant women the right to vote?', 'United States', 'New Zealand', 'Canada', 'Germany', 'New Zealand'),
(4, 4, 'What event triggered the start of World War I?', 'Assassination of Archduke Franz Ferdinand', 'Invasion of Poland', 'Attack on Pearl Harbor', 'Sinking of the Lusitania', 'Assassination of Archduke Franz Ferdinand'),
(4, 5, 'Who was the leader of the Soviet Union during World War II?', 'Stalin', 'Lenin', 'Khrushchev', 'Trotsky', 'Stalin'),
(4, 6, 'Which ancient civilization built the pyramids?', 'Ancient Greece', 'Ancient Rome', 'Ancient Egypt', 'Ancient Mesopotamia', 'Ancient Egypt'),
(4, 7, 'What year did the Berlin Wall fall?', '1987', '1990', '1989', '1992', '1989'),
(4, 8, 'Which country was formerly known as Persia?', 'Iraq', 'Iran', 'Afghanistan', 'Syria', 'Iran'),
(4, 9, 'Who was the famous queen of ancient Egypt?', 'Cleopatra', 'Nefertiti', 'Hatshepsut', 'Maatkare', 'Cleopatra');

INSERT INTO MCQ (topicID, quesIdx, question, op1, op2, op3, op4, CorrectAns) 
VALUES
(5, 0, 'What is the main advantage of using Vite for web development?', 'Faster build times', 'Server-side rendering', 'Static site generation', 'Built-in state management', 'Faster build times'),
(5, 1, 'Which of the following features does Next.js support?', 'Server-side rendering', 'Virtual DOM', 'Static site generation', 'Both a and c', 'Both a and c'),
(5, 2, 'What is the default rendering method in Next.js?', 'Static site generation', 'Client-side rendering', 'Server-side rendering', 'Progressive rendering', 'Server-side rendering'),
(5, 3, 'Which of the following is a feature of Vite?', 'Zero-config setup', 'Bundling with Webpack', 'SSR support out of the box', 'Built-in API routes', 'Zero-config setup'),
(5, 4, 'What does Next.js use to enable automatic code splitting?', 'React Context API', 'React.lazy', 'Dynamic imports', 'Web Workers', 'Dynamic imports'),
(5, 5, 'What type of project is Next.js best suited for?', 'Static websites only', 'Web apps with dynamic data and SEO requirements', 'Mobile apps', 'Single-page apps without SEO', 'Web apps with dynamic data and SEO requirements'),
(5, 6, 'Which feature does Vite provide that improves the development experience?', 'Hot Module Replacement (HMR)', 'Server-side rendering', 'Incremental static regeneration', 'Pre-rendering', 'Hot Module Replacement (HMR)'),
(5, 7, 'Which command is used to start a Next.js development server?', 'npm start', 'next start', 'npm run dev', 'next dev', 'next dev'),
(5, 8, 'How does Next.js handle routing?', 'With file-based routing', 'With manual routing configuration', 'Using React Router', 'With page components only', 'With file-based routing'),
(5, 9, 'Which of these is NOT a feature of Vite?', 'Fast development server', 'Built-in server-side rendering', 'Fast build process', 'Hot module replacement', 'Built-in server-side rendering');
