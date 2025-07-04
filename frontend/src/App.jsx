"use client"

import { useState } from "react"
import { CompetencesList } from "./pages/CompetencesList"
import { CompetenceForm } from "./pages/CompetenceForm"
import { CompetenceDetail } from "./pages/CompetenceDetail"
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("list")
  const [selectedCompetence, setSelectedCompetence] = useState(null)
  const [editingCompetence, setEditingCompetence] = useState(null)

  const handleViewChange = (view, competence = null) => {
    setCurrentView(view)
    setSelectedCompetence(competence)
    setEditingCompetence(competence)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "form":
        return (
          <CompetenceForm
            competence={editingCompetence}
            onBack={() => handleViewChange("list")}
            onSuccess={() => handleViewChange("list")}
          />
        )
      case "detail":
        return (
          <CompetenceDetail
            competence={selectedCompetence}
            onBack={() => handleViewChange("list")}
            onEdit={(competence) => handleViewChange("form", competence)}
          />
        )
      default:
        return (
          <CompetencesList
            onCreateNew={() => handleViewChange("form")}
            onViewDetail={(competence) => handleViewChange("detail", competence)}
            onEdit={(competence) => handleViewChange("form", competence)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">{renderCurrentView()}</div>
    </div>
  )
}

export default App
