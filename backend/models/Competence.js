const mongoose = require('mongoose');

const SousCompetenceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  valide: { type: Boolean, default: false },
  importante: { type: Boolean, default: false },
});

const CompetenceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      match: [/^C[1-8]$/, 'Le code doit être entre C1 et C8'],
    },
    nom: { type: String, required: true },
    sousCompetences: [SousCompetenceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Competence', CompetenceSchema);
