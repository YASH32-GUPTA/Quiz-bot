import { Telegraf, Markup } from "telegraf";
import dotenv from 'dotenv';
// Database 
import { calculateTotalScore, createPointsTable, executeQuery, fetchParagraphByTopic, insertOrUpdateUserData, resetPointsTable, updateUserAnswerStatus , insertLog , clearLogs} from "./Database/database.js";

// TO Access ENV data 
// dotenv.config();


// const bot = new Telegraf(process.env.token);
const bot = new Telegraf('7763189269:AAHC9b6bmH7rFmeRev2eEk4dClhkbCQIqa0'); // for the git hub 




// user session 
let userScores = {};

// Commands 

// Start Command 
bot.start(async (ctx) => {
    await getStart(ctx , false) ; 
});

// End Command  
bot.command('end',  async(ctx)=>{
    // reset the table points 
    resetPointsTable(ctx.from.id) ;
    // clear all the chats ( fresh start )
    await clearChat(ctx) ; 

}) ;


// clear function 
async function clearChat(ctx){

    // IN PROGRESS 
    let res = await ctx.reply("⏳ Ending the quiz... Please wait while I wrap things up! 🛠️");
    await insertLog(ctx.from.id , res.message_id) ;
    
    await clearLogs(ctx) ;

    // remove session 
    delete userScores[ctx.from.id];


   getStart(ctx  , true ) ; 
}

// Quiz start function 
async function getStart(ctx , end) {

    // Clear data At start 
    delete userScores[ctx.from.id];

    const startMessage = await ctx.reply(
        "🤖 Hi there! I'm your Quiz Companion, ready to make learning exciting! 🎉\n\nCommands:\n/start - To Start the Quiz After Ends.\n/end - To End the Quiz In Between."
    );
    

    await insertLog(ctx.from.id ,startMessage.message_id ) ;


    const welcomeMessage = await ctx.reply(
        end ? "Welcome Back ! to the quiz Please select a topic:" : "Welcome to the quiz! Please select a topic:"  
    );

    await insertLog(ctx.from.id ,welcomeMessage.message_id ) ;
    
    
    const message1 = await ctx.reply(
        "Choose a topic by clicking a button:",
        Markup.inlineKeyboard([
            [Markup.button.callback('Technology Quiz', 'START_QUIZ|1')],
            [Markup.button.callback('Universe Quiz', 'START_QUIZ|2')],
            [Markup.button.callback('Science Quiz', 'START_QUIZ|3')],
            [Markup.button.callback('History Quiz', 'START_QUIZ|4')]
        ])
    );

    await insertLog(ctx.from.id ,message1.message_id ) ;

    
}

// fetch questions 
async function askQuestion(ctx, topicID) {
    const userId = ctx.from.id;
    const questionIndex = userScores[userId].currentQuestion;

    const query = `SELECT * FROM MCQ WHERE topicID = ${topicID}`;
    const questions = await executeQuery(query);

    if (questionIndex < questions.length) {
        const question = questions[questionIndex];

        const message = await ctx.replyWithMarkdownV2(
            `*Question ${questionIndex + 1}*:\n\n*${escapeMarkdownV2(question.question)}*\n\n` +
            // Join options with proper formatting
            [question.op1, question.op2, question.op3, question.op4].map((option, i) => `_${i + 1}\\. ${escapeMarkdownV2(option)}_`).join("\n") +
            `\n\n_Select an answer by clicking a button below:_`,
            Markup.inlineKeyboard(
                [question.op1, question.op2, question.op3, question.op4].map((option, index) => [
                    Markup.button.callback(`Option ${index + 1}`, `ANSWER_${questionIndex}_${index}`)
                ])
            )
        );

        await  insertLog(userId ,message.message_id)
    } else {
        // If no more questions, display the score
        await displayScore(ctx,questions.length);
    }
}

// escape special characters 
function escapeMarkdownV2(text) {
    return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

// Display final score ( Restart )
async function displayScore(ctx,total) {
    const userId = ctx.from.id;
    const score = await calculateTotalScore(userId);
    const message = await ctx.replyWithMarkdownV2(`*Quiz Complete\\!* 🎉\n\n*Your final score: ${score} out of ${total}*`);

    // Store Score 
    insertOrUpdateUserData(userId, ctx.from.first_name , ctx.from.last_name, userScores[userId].topicSelected , score ) ;

    await insertLog(userId , message.message_id)



     const askAgainMessage = await ctx.reply(
        "Would you like to play another quiz?",
        Markup.inlineKeyboard([
            [Markup.button.callback('Yes', 'RESTART_QUIZ')],
            [Markup.button.callback('No', 'END_QUIZ')]
        ])
    );
    await insertLog(userId , askAgainMessage.message_id)

}


// ACTIONS 



// Handle topic selection 
bot.action(/START_QUIZ\|(\d+)/, async (ctx) => {
    const userId = ctx.from.id;
    const topicID = ctx.match[1]; 
    const topicNames = ['Technology', 'Universe', 'Science', 'History']; 
    const topicSelected = topicNames[parseInt(topicID) - 1]; 

    if (!userScores[userId]) {
        userScores[userId] = { score: 0, currentQuestion: 0, topicID: topicID , topicSelected : topicSelected }; 
    } else {
        userScores[userId].topicID = topicID;  
    }

    const firstName = ctx.from.first_name;
    const lastName = ctx.from.last_name || '';

    // Insert / update user data
    insertOrUpdateUserData(userId, firstName, lastName, topicSelected);
    // Create Points table 
    createPointsTable(userId);

    const message2 = await ctx.reply(
       `User Details\n\nUser ID: ${userId}\nName: ${firstName} ${lastName}\n\nYou have selected ${topicSelected}! Starting the quiz...`
    );

    
    await insertLog(userId,message2.message_id) ;


    const response = await fetchParagraphByTopic(topicSelected);
    let para = await ctx.reply(
        "Read the Passage Carefully and Answer 10 MCQ questions\n\n" + response.paragraph
    );
    
    await insertLog(userId,para.message_id) ;

    userScores[userId].topicID = response.topicID ; 
    await askQuestion(ctx, response.topicID);
});


// Handling answer selections dynamically
bot.action(/ANSWER_(\d+)_(\d+)/, async (ctx) => {
    const userId = ctx.from.id;
    const questionIndex = parseInt(ctx.match[1]); 
    const optionIndex = parseInt(ctx.match[2]); 
    let isCorrect = false ; 

    const topicID = userScores[userId].topicID; 


    const query = `SELECT * FROM MCQ WHERE topicID = ${topicID}`;
    const questions = await executeQuery(query);

    if (!questions || questions.length <= questionIndex) {
        console.error("Question not found for the given index.");
        return;
    }

    const question = questions[questionIndex];


    const options = [question.op1, question.op2, question.op3, question.op4];

    if (!options[optionIndex]) {
        console.error("Selected option does not exist.");
        return;
    }

    const selectedOption = options[optionIndex]; 


    if (selectedOption === question.CorrectAns) {
        userScores[userId].score += 1;
        isCorrect = true;
        await updateUserAnswerStatus(userId , questionIndex , 1 ) ;
    }
    else{
        await updateUserAnswerStatus(userId , questionIndex , 0 ) ;
    }


    const message = await ctx.replyWithMarkdownV2(
        isCorrect
            ? `🟩 *Correct\\!* Great job\\! That’s correct\\!`
            : `🟥 *Incorrect\\!* Good try\\. The correct answer is _${escapeMarkdownV2(question.CorrectAns)}_`
    );

    await insertLog(userId , message.message_id) ;

    // next question
    userScores[userId].currentQuestion += 1;
    await askQuestion(ctx, topicID); 
});


// restarting the quiz
bot.action('RESTART_QUIZ', async (ctx) => {
    resetPointsTable(ctx.from.id) ;
    await clearChat(ctx);  
});

// Ending the quiz
bot.action('END_QUIZ', async (ctx) => {
    let msg = await ctx.reply("Thanks for playing! Hope you enjoyed the quiz! You can use /start command to start a new quiz.");
    await insertLog(ctx.from.id, msg.message_id);
    resetPointsTable(ctx.from.id);
});


// RANDOM TEXT 
bot.on('text', async (ctx) => {
    let res = await ctx.reply("🤖 I'm sorry, I can't process this. Please use the commands provided to interact with me.");
    await insertLog(ctx.from.id , res.message_id) ;

});


// Start the bot
bot.launch();

// For Closing Connection  
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
