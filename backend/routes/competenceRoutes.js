const express = require('express');
const router = express.Router();
const {
  getCompetences,
  createCompetence,
  updateEvaluation,
} = require('../controllers/competenceController');

router.get('/', getCompetences);
router.post('/', createCompetence);
router.put('/:id/evaluation', updateEvaluation);

module.exports = router;