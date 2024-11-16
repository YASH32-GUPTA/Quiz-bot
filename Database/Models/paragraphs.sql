CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

CREATE TABLE IF NOT EXISTS Paragraphs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,       -- Topic of the quiz (e.g., "Nature", "Technology")
    topicID INT NOT NULL,              -- Unique ID for the topic (used in MCQs)
    paragraph TEXT NOT NULL            -- The paragraph content
);

INSERT INTO Paragraphs (topic, topicID, paragraph) 
VALUES ('Technology', 1, 'JavaScript (JS) is a high-level, dynamic programming language that is widely used for web development. Initially created by Netscape as a means to add interactive features to websites, JavaScript is now an essential part of modern web technologies. It is primarily used to create dynamic and interactive web pages by manipulating HTML and CSS elements. JavaScript is executed on the client-side, meaning it runs in the user’s browser, though server-side JavaScript (via Node.js) is also increasingly popular. Its flexibility and vast ecosystem of libraries and frameworks make it a go-to choice for developers building modern web applications.');

INSERT INTO Paragraphs (topic, topicID, paragraph) 
VALUES ('Universe', 2, 'The universe is vast, encompassing everything we know and beyond. It includes all matter, energy, galaxies, stars, and planets, bound by the laws of physics. The universe began around 13.8 billion years ago with the Big Bang, and it continues to expand ever since. Our galaxy, the Milky Way, is just one of billions in the observable universe. While the mysteries of dark matter, black holes, and cosmic inflation remain subjects of intense study, scientists continue to explore the cosmos through advanced telescopes and space missions. The universe\'s enormity challenges our understanding, yet it sparks endless curiosity.');

INSERT INTO Paragraphs (topic, topicID, paragraph) 
VALUES ('Science', 3, 'Science is a broad field of study that seeks to understand the natural world through observation and experimentation. It includes multiple branches, such as chemistry, physics, biology, and earth sciences. Water, represented by the chemical formula H2O, is essential for life and plays a crucial role in many scientific processes. In biology, the mitochondria are known as the powerhouse of the cell, providing energy for cellular activities. Plants rely on photosynthesis to produce food, absorbing carbon dioxide and sunlight. Chemistry explores the chemical elements and compounds that make up matter, while physics delves into the laws governing energy and forces. The study of the environment, including the Earths atmosphere and climate, is crucial for understanding the world around us.');

INSERT INTO Paragraphs (topic, topicID, paragraph) 
VALUES 
('History', 4, 'History is the study of past events, particularly in human affairs. It encompasses the study of civilizations, cultures, and the individuals and groups that shaped the world as we know it. Key historical events, such as the signing of the Magna Carta in 1215, the American Revolution, and the two World Wars, have significantly influenced the political, economic, and social structures of the modern world. History allows us to understand the causes and effects of events, how societies evolve, and the lessons learned from past mistakes. Through studying history, we gain insights into humanity’s progress and its continuous quest for knowledge and power.');

INSERT INTO Paragraphs (topic, topicID, paragraph) 
VALUES 
('Technology', 5, 'Vite and Next.js are two modern technologies in the world of web development that help developers build fast, scalable, and high-performance applications. Vite is a build tool designed to optimize the development experience by providing fast hot module replacement (HMR) and a lightning-fast build time. On the other hand, Next.js is a popular React framework that enables server-side rendering (SSR) and static site generation (SSG). Both tools are built to support the needs of modern web development, making it easier for developers to deliver optimized applications with enhanced performance, scalability, and SEO features.');

select *  from Paragraphs ; 


SELECT count(*) FROM Paragraphs where topic = 'Technology' ; 