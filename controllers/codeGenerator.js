const Code = require('../models/codeModel');


// Function to generate a random alphanumeric code
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
}

exports.generateNewCode = async (req, res, next) => {
    try {
        // Generate a random code
        const randomCode = generateRandomCode(Math.floor(Math.random() * 2) + 5);

        // Create a new code document
        const code = new Code({
            code: randomCode
        });

        // Save the code to the database
        await code.save();

        res.status(200).json({ code: randomCode });
        } catch (error) {
        console.error('Error generating code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}