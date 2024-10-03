const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB} = require('./config/db');

dotenv.config({
    path: './.env',
}
);