"use client"

import { useState } from "react"
import { useCompetences } from "../hooks/useCompetences"
import { Button } from "../components/Button"
import { SubCompetenceList } from "../components/SubCompetenceList"
import { getStatusColor, getStatusLabel, getCompetenceStats } from "../utils/statusUtils"
import { ArrowLeft, Edit, Award, Target, TrendingUp, Calendar } from "lucide-react"

export const CompetenceDetail = ({ competence, onBack, onEdit }) => {
  const { updateEvaluation } = useCompetences()
  const [loading, setLoading] = useState(false)
  const [localSousCompetences, setLocalSousCompetences] = useState(competence?.sousCompetences || [])

  const statusColors = getStatusColor(competence?.statut)
  const stats = getCompetenceStats(localSousCompetences)

  const handleToggleSousCompetence = async (index, newStatus) => {
    const updatedSousCompetences = localSousCompetences.map((sc, i) =>
      i === index ? { ...sc, valide: newStatus } : sc,
    )

    setLocalSousCompetences(updatedSousCompetences)

    try {
      setLoading(true)
      await updateEvaluation(competence._id, { sousCompetences: updatedSousCompetences })
    } catch (error) {
      // Revenir à l'état précédent en cas d'erreur
      setLocalSousCompetences(competence.sousCompetences)
      alert("Erreur lors de la mise à jour de l'évaluation")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleImportant = async (index) => {
    const updatedSousCompetences = localSousCompetences.map((sc, i) =>
      i === index ? { ...sc, importante: !sc.importante } : sc,
    )
    setLocalSousCompetences(updatedSousCompetences)
    try {
      setLoading(true)
      await updateEvaluation(competence._id, { sousCompetences: updatedSousCompetences })
    } catch (error) {
      setLocalSousCompetences(competence.sousCompetences)
      alert("Erreur lors de la mise à jour de l'importance")
    } finally {
      setLoading(false)
    }
  }

  if (!competence) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Compétence non trouvée</p>
        <Button onClick={onBack} className="mt-4">
          Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} icon={<ArrowLeft className="w-5 h-5" />}>
              Retour
            </Button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold gradient-text">
                  {competence.code} - {competence.nom}
                </h1>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}
                >
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
                    <span>{getStatusLabel(competence.statut)}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">Détails et évaluation de la compétence</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="primary" onClick={() => onEdit(competence)} icon={<Edit className="w-5 h-5" />}>
              Modifier
            </Button>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-blue-100 text-xs">sous-compétences</p>
              </div>
              <Target className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Validées</p>
                <p className="text-3xl font-bold">{stats.validees}</p>
                <p className="text-green-100 text-xs">compétences</p>
              </div>
              <Award className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Non validées</p>
                <p className="text-3xl font-bold">{stats.nonValidees}</p>
                <p className="text-red-100 text-xs">compétences</p>
              </div>
              <Calendar className="w-8 h-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Progression</p>
                <p className="text-3xl font-bold">{stats.pourcentage}%</p>
                <p className="text-purple-100 text-xs">complétée</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Barre de progression globale */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progression globale</span>
            <span className="text-sm font-bold text-gray-900">{stats.pourcentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${stats.pourcentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Liste des sous-compétences */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Target className="w-6 h-6 mr-2 text-indigo-600" />
            Sous-compétences ({localSousCompetences.length})
          </h2>
          {loading && (
            <div className="flex items-center space-x-2 text-indigo-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
              <span className="text-sm">Mise à jour...</span>
            </div>
          )}
        </div>

        <SubCompetenceList
          sousCompetences={localSousCompetences}
          onToggle={handleToggleSousCompetence}
          onToggleImportant={handleToggleImportant}
          editable={true}
        />
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Règles d'évaluation</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 rounded-full p-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Critère de validation</h4>
              <p className="text-blue-800 text-sm">
                Une compétence est considérée comme <strong>validée</strong> si le nombre de sous-compétences validées
                est supérieur ou égal au nombre de sous-compétences non validées.
              </p>
              <p className="text-blue-700 text-xs mt-2">
                Actuellement: {stats.validees} validées ≥ {stats.nonValidees} non validées ={" "}
                {stats.validees >= stats.nonValidees ? "VALIDÉE" : "NON VALIDÉE"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
