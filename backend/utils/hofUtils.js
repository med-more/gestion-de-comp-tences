/**
 * Calcule le statut global d'une compétence à partir de ses sous-compétences.
 * Statut global = 'validée' si le nombre de sous-compétences validées >= non validées, sinon 'non validée'.
 * Si aucune sous-compétence, retourne 'non définie'.
 * @param {Array<{valide: boolean}>} sousCompetences - Liste des sous-compétences
 * @returns {string} Statut global ('validée', 'non validée', 'non définie')
 */
const calculateGlobalStatus = (sousCompetences = []) => {
  if (!Array.isArray(sousCompetences) || sousCompetences.length === 0) return 'non définie';
  const { validees, nonValidees } = sousCompetences.reduce(
    (acc, s) => {
      if (s.valide) acc.validees++;
      else acc.nonValidees++;
      return acc;
    },
    { validees: 0, nonValidees: 0 }
  );
  
  if (validees > nonValidees) return 'validée';
  if (validees < nonValidees) return 'non validée';
  
  // Cas d'égalité : on regarde s'il existe une sous-compétence importante ET validée
  const hasImportantValid = sousCompetences.some((sc) => sc.importante && sc.valide);
  return hasImportantValid ? 'validée' : 'non validée';
};

/**
 * Filtre les sous-compétences validées.
 * @param {Array<{valide: boolean}>} sousCompetences - Liste de sous-compétences
 * @returns {Array} Sous-compétences validées
 */
const filterValidatedSkills = (sousCompetences = []) => sousCompetences.filter(s => s.valide);

/**
 * Ajoute le statut global à chaque compétence à partir de ses sous-compétences.
 * @param {Array<{sousCompetences: Array<{valide: boolean}>}>} competences - Liste de compétences
 * @returns {Array} Compétences avec statut global
 */
const mapSkillsWithStatus = (competences = []) =>
  competences.map(competence => ({
    ...competence,
    statut: calculateGlobalStatus(competence.sousCompetences)
  }));

/**
 * Compose plusieurs fonctions de gauche à droite.
 * @param  {...Function} fns - Fonctions à composer
 * @returns {Function}
 */
const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

module.exports = {
  calculateGlobalStatus,
  filterValidatedSkills,
  mapSkillsWithStatus,
  compose
};