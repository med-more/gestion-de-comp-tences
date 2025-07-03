"use client"

import { useState } from "react"
import { useCompetences } from "../hooks/useCompetences"
import { CompetenceCard } from "../components/CompetenceCard"
import { Button } from "../components/Button"
import { Plus, Search, Filter, Award, TrendingUp, Users, Target } from "lucide-react"

export const CompetencesList = ({ onCreateNew, onViewDetail, onEdit }) => {
  const { competences, loading, error, deleteCompetence } = useCompetences()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleDelete = async (competence) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la compétence "${competence.nom}" ?`)) {
      try {
        await deleteCompetence(competence._id)
      } catch (error) {
        alert("Erreur lors de la suppression de la compétence")
      }
    }
  }

  const filteredCompetences = competences.filter((competence) => {
    const matchesSearch =
      competence.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competence.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || competence.statut === filterStatus
    return matchesSearch && matchesFilter
  })

  // Calcul des statistiques globales
  const stats = {
    total: competences.length,
    validees: competences.filter((c) => c.statut === "validee").length,
    nonValidees: competences.filter((c) => c.statut === "non-validee").length,
    pourcentageGlobal:
      competences.length > 0
        ? Math.round((competences.filter((c) => c.statut === "validee").length / competences.length) * 100)
        : 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des compétences...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Erreur: {error}</div>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2">
                Gestion des Compétences
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Suivez et évaluez les compétences de votre équipe
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={onCreateNew}
              icon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Nouvelle Compétence</span>
              <span className="sm:hidden">Nouvelle</span>
            </Button>
          </div>

          {/* Statistiques globales */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-gradient-to-r from-stone-600 to-stone-700 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-200 text-xs sm:text-sm">Total</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.total}</p>
                </div>
                <Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-stone-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-xs sm:text-sm">Validées</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.validees}</p>
                </div>
                <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-emerald-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-xs sm:text-sm">Non validées</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.nonValidees}</p>
                </div>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-xs sm:text-sm">Progression</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.pourcentageGlobal}%</p>
                </div>
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Barre de recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Rechercher une compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-sm sm:text-base"
            />
          </div>

          {/* Filtre par statut */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-8 sm:pl-10 pr-8 py-2 sm:py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
            >
              <option value="all">Tous les statuts</option>
              <option value="validee">Validées</option>
              <option value="non-validee">Non validées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des compétences */}
      {filteredCompetences.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus !== "all" ? "Aucune compétence trouvée" : "Aucune compétence définie"}
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
            {searchTerm || filterStatus !== "all"
              ? "Essayez de modifier vos critères de recherche"
              : "Commencez par créer votre première compétence"}
          </p>
          {!searchTerm && filterStatus === "all" && (
            <Button variant="primary" onClick={onCreateNew} icon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}>
              Créer une compétence
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredCompetences.map((competence) => (
            <CompetenceCard
              key={competence._id}
              competence={competence}
              onView={onViewDetail}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
