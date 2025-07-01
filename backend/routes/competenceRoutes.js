const express = require('express');
const router = express.Router();
const {
  getCompetences,
  createCompetence,
} = require('../controllers/competenceController');

router.get('/', getCompetences);
router.post('/', createCompetence);

module.exports = router;