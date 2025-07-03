/**
 * Formate un nom de compétence
 */
export const formatCompetenceName = (nom) => {
  if (!nom) return ""
  return nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase()
}

/**
 * Formate un code de compétence
 */
export const formatCompetenceCode = (code) => {
  if (!code) return ""
  return code.toUpperCase()
}

/**
 * Génère un ID unique pour les nouvelles compétences
 */
export const generateCompetenceId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Valide le format d'un code de compétence (C1, C2, etc.)
 */
export const validateCompetenceCode = (code) => {
  const pattern = /^C\d+$/i
  return pattern.test(code)
}

/**
 * Tronque un texte à une longueur donnée
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

/**
 * Formate une date en français
 */
export const formatDate = (date) => {
  if (!date) return ""

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return new Date(date).toLocaleDateString("fr-FR", options)
}

/**
 * Capitalise la première lettre de chaque mot
 */
export const capitalizeWords = (str) => {
  if (!str) return ""
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}
