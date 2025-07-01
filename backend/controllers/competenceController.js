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

