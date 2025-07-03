"use client"

import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { useCompetences } from "../hooks/useCompetences"
import { Button } from "../components/Button"
import { ArrowLeft, Plus, X, Save, Code, BookOpen } from "lucide-react"
import { validateCompetenceCode } from "../utils/formatUtils"

export const CompetenceForm = ({ competence, onBack, onSuccess }) => {
  const { createCompetence, updateCompetence } = useCompetences()
  const [loading, setLoading] = useState(false)
  const [sousCompetences, setSousCompetences] = useState(competence?.sousCompetences || [{ nom: "", valide: false, importante: false }])

  const validationRules = {
    code: {
      required: true,
      validate: (value) => {
        if (!validateCompetenceCode(value)) {
          return "Le code doit être au format C1, C2, etc."
        }
      },
      message: "Code de compétence requis",
    },
    nom: {
      required: true,
      minLength: 3,
      message: "Le nom de la compétence est requis (min. 3 caractères)",
    },
  }

  const { values, errors, handleChange, handleBlur, validateAll, setValue } = useForm(
    {
      code: competence?.code || "",
      nom: competence?.nom || "",
    },
    validationRules,
  )

  const addSousCompetence = () => {
    setSousCompetences([...sousCompetences, { nom: "", valide: false, importante: false }])
  }

  const removeSousCompetence = (index) => {
    if (sousCompetences.length > 1) {
      setSousCompetences(sousCompetences.filter((_, i) => i !== index))
    }
  }

  const updateSousCompetence = (index, field, value) => {
    const updated = sousCompetences.map((sc, i) => (i === index ? { ...sc, [field]: value } : sc))
    setSousCompetences(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateAll()) {
      return
    }

    // Valider les sous-compétences
    const validSousCompetences = sousCompetences.filter((sc) => sc.nom.trim() !== "")
    if (validSousCompetences.length === 0) {
      alert("Veuillez ajouter au moins une sous-compétence")
      return
    }

    setLoading(true)
    try {
      const competenceData = {
        ...values,
        code: values.code.toUpperCase(),
        sousCompetences: validSousCompetences,
      }

      if (competence) {
        await updateCompetence(competence._id, competenceData)
      } else {
        await createCompetence(competenceData)
      }

      onSuccess()
    } catch (error) {
      alert("Erreur lors de la sauvegarde de la compétence")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} icon={<ArrowLeft className="w-5 h-5" />}>
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {competence ? "Modifier la compétence" : "Nouvelle compétence"}
              </h1>
              <p className="text-gray-600">
                {competence
                  ? "Modifiez les informations de la compétence"
                  : "Créez une nouvelle compétence et définissez ses sous-compétences"}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations générales */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Code className="w-6 h-6 mr-2 text-indigo-600" />
            Informations générales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Code de la compétence *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex: C1, C2, C3..."
                className={`
                  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  ${errors.code ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la compétence *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={values.nom}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex: Développement Frontend"
                className={`
                  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  ${errors.nom ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
            </div>
          </div>
        </div>

        {/* Sous-compétences */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
              Sous-compétences ({sousCompetences.length})
            </h2>
            <Button type="button" variant="secondary" onClick={addSousCompetence} icon={<Plus className="w-4 h-4" />}>
              Ajouter
            </Button>
          </div>

          <div className="space-y-4">
            {sousCompetences.map((sousCompetence, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={sousCompetence.nom}
                    onChange={(e) => updateSousCompetence(index, "nom", e.target.value)}
                    placeholder="Nom de la sous-compétence"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sousCompetence.valide}
                      onChange={(e) => updateSousCompetence(index, "valide", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Validée</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sousCompetence.importante}
                      onChange={(e) => updateSousCompetence(index, "importante", e.target.checked)}
                    />
                    <span>Importante</span>
                  </label>

                  {sousCompetences.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeSousCompetence(index)}
                      icon={<X className="w-4 h-4" />}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {sousCompetences.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune sous-compétence définie</p>
              <Button
                type="button"
                variant="primary"
                onClick={addSousCompetence}
                className="mt-4"
                icon={<Plus className="w-4 h-4" />}
              >
                Ajouter la première sous-compétence
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onBack} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" variant="primary" loading={loading} icon={<Save className="w-4 h-4" />}>
              {competence ? "Mettre à jour" : "Créer la compétence"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
