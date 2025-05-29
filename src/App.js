import React, { useState } from "react";
import QuicksButton from "./components/QuicksButton";
import QuicksPopup from "./components/QuicksPopup";
import "./index.css";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const handleToggleQuicks = (origin) => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);

      setActiveTab(activeTab || "inbox");
    } else {
 
      if (origin === activeTab || origin === "main") {
        setIsPanelOpen(false);
        setActiveTab(null);
      } else if (origin === null) {
        setIsPanelOpen(false);
        setActiveTab(null);
      }
    }
  };

  const handleOpenTab = (tabName) => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);
      setActiveTab(tabName);
    } else {
      if (activeTab === tabName) {
        setIsPanelOpen(false);
        setActiveTab(null);
      } else {
        setActiveTab(tabName);
      }
    }
  };

  return (
    <div className="min-h-screen bg-quicks-panel-bg relative font-lato">
      <QuicksPopup
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isVisible={isPanelOpen}
      />

      <QuicksButton
        onToggleQuicks={handleToggleQuicks}
        onOpenTab={handleOpenTab}
        activeTab={activeTab}
        isPanelOpen={isPanelOpen}
      />
    </div>
  );
}

export default App;
