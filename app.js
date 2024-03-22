const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

const codeRouter = require('./routes/codeRouter');
const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use('/api', codeRouter);
app.all('*', (req, res) => {
    res.status(200).json({
        message: 'wealthup assignment api'
    })
})

module.exports = app;