const Code = require('../models/codeModel');


exports.verifyCode = async (req, res, next) => {
    const {code} = req.body;
    try {
        const dbCode = await Code.findOne({ code });

        // Check if code exists in the database
        if (!dbCode) {
            // Create a invalid code document if it doesn't exist
            const newCode = new Code({
                code: code,
                validCode: false
            });
            // Save the new code to the database
            await newCode.save();
            return res.status(400).json({ error: 'Enter a valid code' });
        }

        // Check if code is expired
        const currentTime = Date.now();
        if (dbCode.expiry && dbCode.expiry < currentTime) {
            return res.status(400).json({ error: 'The code has expired' });
        }

        // Check if code has already been used
        if (dbCode.used) {
            return res.status(400).json({ error: 'This code has already been used' });
        }

        // Update the code status to mark it as used
        await Code.updateOne({ code }, { $set: { used: true } });

        // Send success response
        return res.status(200).json({ message: 'Code is correct' });
    } catch (error) {
        console.error('Error verifying code:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}