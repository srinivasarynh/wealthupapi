const express = require('express');
const {generateNewCode} = require('../controllers/codeGenerator');
const {verifyCode} = require('../controllers/codeVerifier');
const {getAllCodes} = require('../controllers/allCodes');

const router = express.Router();

router.get('/codes', generateNewCode);
router.post('/codes/use', verifyCode);
router.get('/allcodes', getAllCodes);


module.exports = router;