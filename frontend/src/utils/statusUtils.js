/**
 * Calcule le statut d'une compétence basé sur ses sous-compétences
 * Une compétence est validée si le nombre de sous-compétences validées >= non validées
 */
export const calculateCompetenceStatus = (sousCompetences = []) => {
  if (!Array.isArray(sousCompetences) || sousCompetences.length === 0) {
    return "non-validee"
  }

  const validees = sousCompetences.filter((sc) => sc.valide).length
  const nonValidees = sousCompetences.length - validees

  if (validees > nonValidees) return "validee"
  if (validees < nonValidees) return "non-validee"

  // Cas d'égalité : on regarde s'il existe une sous-compétence importante ET validée
  const hasImportantValid = sousCompetences.some((sc) => sc.importante && sc.valide)
  return hasImportantValid ? "validee" : "non-validee"
}

/**
 * Calcule les statistiques d'une compétence
 */
export const getCompetenceStats = (sousCompetences = []) => {
  const total = sousCompetences.length
  const validees = sousCompetences.filter((sc) => sc.valide).length
  const nonValidees = total - validees
  const pourcentage = total > 0 ? Math.round((validees / total) * 100) : 0

  return {
    total,
    validees,
    nonValidees,
    pourcentage,
  }
}

/**
 * Retourne la couleur associée au statut
 */
export const getStatusColor = (statut) => {
  switch (statut) {
    case "validee":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        dot: "bg-green-500",
      }
    case "non-validee":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        dot: "bg-red-500",
      }
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        dot: "bg-gray-500",
      }
  }
}

/**
 * Retourne le libellé du statut
 */
export const getStatusLabel = (statut) => {
  switch (statut) {
    case "validee":
      return "Validée"
    case "non-validee":
      return "Non validée"
    default:
      return "Indéterminé"
  }
}
