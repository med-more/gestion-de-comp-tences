"use client"
import { Button } from "./Button"
import { getStatusColor, getStatusLabel, getCompetenceStats } from "../utils/statusUtils"
import { Eye, Edit, Trash2, Award, Target } from "lucide-react"

export const CompetenceCard = ({ competence, onView, onEdit, onDelete }) => {
  const statusColors = getStatusColor(competence.statut)
  const stats = getCompetenceStats(competence.sousCompetences)

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover group w-full">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="bg-white/20 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
              <Award className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold truncate">{competence.code}</h3>
              <p className="text-red-100 text-xs sm:text-sm truncate">{competence.nom}</p>
            </div>
          </div>

          {/* Badge de statut */}
          <div
            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border} flex-shrink-0`}
          >
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${statusColors.dot}`}></div>
              <span className="hidden sm:inline">{getStatusLabel(competence.statut)}</span>
              <span className="sm:hidden">{competence.statut === "validee" ? "✓" : "✗"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-4 sm:p-6">
        {/* Statistiques */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Progression</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">{stats.pourcentage}%</span>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-stone-200 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.pourcentage}%` }}
            ></div>
          </div>

          {/* Détails des stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="bg-stone-50 rounded-lg p-2 sm:p-3">
              <div className="text-sm sm:text-lg font-bold text-stone-900">{stats.total}</div>
              <div className="text-xs text-stone-600">Total</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 sm:p-3">
              <div className="text-sm sm:text-lg font-bold text-emerald-700">{stats.validees}</div>
              <div className="text-xs text-stone-600">Validées</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2 sm:p-3">
              <div className="text-sm sm:text-lg font-bold text-red-700">{stats.nonValidees}</div>
              <div className="text-xs text-stone-600">À valider</div>
            </div>
          </div>
        </div>

        {/* Aperçu des sous-compétences */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 flex items-center">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Sous-compétences ({competence.sousCompetences?.length || 0})</span>
            <span className="sm:hidden">Sous-comp. ({competence.sousCompetences?.length || 0})</span>
          </h4>
          <div className="space-y-1 sm:space-y-2 max-h-24 sm:max-h-32 overflow-y-auto">
            {competence.sousCompetences?.slice(0, 3).map((sc, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${sc.validee ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className={`${sc.validee ? "text-gray-700" : "text-gray-500"} truncate`}>{sc.nom}</span>
              </div>
            ))}
            {competence.sousCompetences?.length > 3 && (
              <div className="text-xs text-gray-500 pl-3 sm:pl-4">
                +{competence.sousCompetences.length - 3} autres...
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onView(competence)}
            icon={<Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="flex-1 justify-center"
          >
            <span className="hidden sm:inline">Voir</span>
            <span className="sm:hidden">Détails</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(competence)}
            icon={<Edit className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="sm:flex-none"
          >
            <span className="hidden sm:inline">Modifier</span>
            <span className="sm:hidden">Édit</span>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(competence)}
            icon={<Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="sm:flex-none"
          >
            <span className="hidden sm:inline">Supprimer</span>
            <span className="sm:hidden">Supp</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
