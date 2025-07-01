const express = require('express');
const router = express.Router();
const {
  getCompetences,
} = require('../controllers/competenceController');

router.get('/', getCompetences);


module.exports = router;