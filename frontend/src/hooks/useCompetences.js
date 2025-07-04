"use client"

import { useState, useEffect } from "react"
import { competenceService } from "../services/competenceService"
import { calculateCompetenceStatus } from "../utils/statusUtils"

export const useCompetences = () => {
  const [competences, setCompetences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCompetences = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await competenceService.getAllCompetences()

      // Calculer le statut pour chaque compétence
      const competencesWithStatus = data.map((competence) => ({
        ...competence,
        statut: calculateCompetenceStatus(competence.sousCompetences),
      }))

      setCompetences(competencesWithStatus)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createCompetence = async (competenceData) => {
    try {
      const newCompetence = await competenceService.createCompetence(competenceData)
      setCompetences((prev) => [
        ...prev,
        {
          ...newCompetence,
          statut: calculateCompetenceStatus(newCompetence.sousCompetences),
        },
      ])
      return newCompetence
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateCompetence = async (id, competenceData) => {
    try {
      const updatedCompetence = await competenceService.updateCompetence(id, competenceData)
      setCompetences((prev) =>
        prev.map((comp) =>
          comp._id === id
            ? { ...updatedCompetence, statut: calculateCompetenceStatus(updatedCompetence.sousCompetences) }
            : comp,
        ),
      )
      return updatedCompetence
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

 const updateEvaluation = async (id, evaluationData) => {
  try {
    const updatedCompetence = await competenceService.updateEvaluation(id, evaluationData);
    setCompetences((prev) =>
      prev.map((comp) =>
        comp._id === id
          ? {
              ...updatedCompetence,
              statut: calculateCompetenceStatus(updatedCompetence.sousCompetences),
            }
          : comp
      )
    );
    return updatedCompetence;
  } catch (err) {
    setError(err.message);
    throw err;
  }
};

  const deleteCompetence = async (id) => {
    try {
      await competenceService.deleteCompetence(id)
      setCompetences((prev) => prev.filter((comp) => comp._id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchCompetences()
  }, [])

  return {
    competences,
    loading,
    error,
    fetchCompetences,
    createCompetence,
    updateCompetence,
    updateEvaluation,
    deleteCompetence,
  }
}
