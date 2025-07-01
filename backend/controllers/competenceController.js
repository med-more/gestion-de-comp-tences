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

exports.updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { sousCompetences } = req.body;
    const competence = await Competence.findByIdAndUpdate(
      id,
      { sousCompetences },
      { new: true }
    );
    if (!competence) return res.status(404).json({ error: 'Not found' });
    res.json({
      ...competence.toObject(),
      statut: calculerStatutGlobal(competence.sousCompetences),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


