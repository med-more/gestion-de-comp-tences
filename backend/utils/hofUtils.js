exports.countValid = (sousCompetences) =>
  sousCompetences.filter(sc => sc.valide).length;

exports.countInvalid = (sousCompetences) =>
  sousCompetences.filter(sc => !sc.valide).length;