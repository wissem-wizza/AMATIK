const express = require('express');

const { createRecord, getRecord } = require('../controllers/parametresDiversController');
const { authenticated } = require("../middleware/authentication");

const router = express.Router();


router.post('/', authenticated, createRecord);

router.get('/:id', authenticated, getRecord);

module.exports = router;
