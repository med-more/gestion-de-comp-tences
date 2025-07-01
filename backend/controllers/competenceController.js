const Competence = require('../models/Competence');
const { calculerStatutGlobal } = require('../services/statusService');

exports.getCompetences = async (req, res) => {
  try {
    const competences = await Competence.find();
    const data = competences.map(comp => ({
      ...comp.toObject(),
      statut: calculerStatutGlobal(comp.sousCompetences),
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCompetence = async (req, res) => {
  try {
    const competence = new Competence(req.body);
    await competence.save();
    res.status(201).json(competence);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

