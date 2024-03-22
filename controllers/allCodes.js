const Code = require('../models/codeModel');


exports.getAllCodes = async (req, res, next) => {
    try {
        // Fetch all codes from the database
        const allCodes = await Code.find({});

        // Send the array of codes as the response
        return res.status(200).json(allCodes);
    } catch (error) {
        console.error('Error retrieving codes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}