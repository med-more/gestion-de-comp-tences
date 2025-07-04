const express = require('express');
const router = express.Router();
const {
  getCompetences,
  createCompetence,
  updateEvaluation,
  deleteCompetence,
  updateCompetence,
} = require('../controllers/competenceController');

router.get('/', getCompetences);
router.post('/', createCompetence);
router.put('/:id/evaluation', updateEvaluation);
router.put('/:id', updateCompetence);
router.delete('/:id', deleteCompetence);

module.exports = router;