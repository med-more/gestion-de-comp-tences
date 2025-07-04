"use client"
import { Check, X, Edit3 } from "lucide-react"
import { Button } from "./Button"

export const SubCompetenceList = ({ sousCompetences = [], onToggle, onEdit, onDelete, editable = false, onToggleImportant }) => {
  if (!sousCompetences.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Edit3 className="w-8 h-8 text-gray-400" />
        </div>
        <p>Aucune sous-compétence définie</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sousCompetences.map((sousCompetence, index) => (
        <div
          key={index}
          className={`
            flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200
            ${
              sousCompetence.valide
                ? "bg-green-50 border-green-200 hover:bg-green-100"
                : "bg-red-50 border-red-200 hover:bg-red-100"
            }
            ${sousCompetence.importante ? "ring-2 ring-yellow-400" : ""}
          `}
        >
          <div className="flex items-center space-x-3">
            {/* Indicateur de statut */}
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${sousCompetence.valide ? "bg-green-500 text-white" : "bg-red-500 text-white"}
            `}
            >
              {sousCompetence.valide ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </div>

            {/* Nom de la sous-compétence */}
            <div>
              <h4
                className={`
                  font-medium flex items-center gap-2
                  ${sousCompetence.valide ? "text-green-800" : "text-red-800"}
                `}
              >
                {sousCompetence.nom}
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                  ${sousCompetence.valide ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}
                `}>
                  {sousCompetence.valide ? "Validée" : "Non validée"}
                </span>
              </h4>
            </div>
          </div>

          {/* Actions */}
          {editable && (
            <div className="flex items-center space-x-2">
              <Button
                variant={sousCompetence.valide ? "danger" : "success"}
                size="sm"
                onClick={() => onToggle(index, !sousCompetence.valide)}
              >
                {sousCompetence.valide ? "Invalider" : "Valider"}
              </Button>

              {onEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(index)}
                  icon={<Edit3 className="w-4 h-4" />}
                >
                  Modifier
                </Button>
              )}

              {onDelete && (
                <Button variant="danger" size="sm" onClick={() => onDelete(index)} icon={<X className="w-4 h-4" />}>
                  Supprimer
                </Button>
              )}

              <Button
                variant={sousCompetence.importante ? "warning" : "secondary"}
                size="sm"
                onClick={() => onToggleImportant(index)}
              >
                {sousCompetence.importante ? "Retirer l'importance" : "Déclarer importante"}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
