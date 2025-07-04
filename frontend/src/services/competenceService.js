import { apiService } from "./api"

export const competenceService = {
  // Récupérer toutes les compétences
  async getAllCompetences() {
    try {
      return await apiService.get("/competences")
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences:", error)
      // Retourner des données mockées en cas d'erreur
      return this.getMockCompetences()
    }
  },

  // Créer une nouvelle compétence
  async createCompetence(competenceData) {
    try {
      return await apiService.post("/competences", competenceData)
    } catch (error) {
      console.error("Erreur lors de la création de la compétence:", error)
      throw error
    }
  },

  // Mettre à jour une compétence
  async updateCompetence(id, competenceData) {
    try {
      return await apiService.put(`/competences/${id}`, competenceData)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la compétence:", error)
      throw error
    }
  },

  // Mettre à jour l'évaluation d'une compétence
 async updateEvaluation(id, evaluationData) {
  try {
    return await apiService.put(`/competences/${id}`, evaluationData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'évaluation:", error);
    throw error;
  }
},

  // Supprimer une compétence
  async deleteCompetence(id) {
    try {
      return await apiService.delete(`/competences/${id}`)
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence:", error)
      throw error
    }
  },

  // Données mockées pour le développement
  getMockCompetences() {
    return [
      {
        _id: "1",
        code: "C1",
        nom: "Développement Frontend",
        sousCompetences: [
          { nom: "HTML5", validee: true },
          { nom: "CSS3", validee: true },
          { nom: "JavaScript ES6+", validee: false },
          { nom: "React.js", validee: true },
          { nom: "Responsive Design", validee: false },
        ],
      },
      {
        _id: "2",
        code: "C2",
        nom: "Développement Backend",
        sousCompetences: [
          { nom: "Node.js", validee: true },
          { nom: "Express.js", validee: true },
          { nom: "MongoDB", validee: true },
          { nom: "API REST", validee: false },
        ],
      },
      {
        _id: "3",
        code: "C3",
        nom: "DevOps & Déploiement",
        sousCompetences: [
          { nom: "Docker", validee: false },
          { nom: "Git", validee: true },
          { nom: "CI/CD", validee: false },
          { nom: "Cloud AWS", validee: false },
        ],
      },
    ]
  },
}
