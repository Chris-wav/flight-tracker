import { createContext, useState } from "react";

export const UIContext = createContext(null);

export const UIContextProvider = ({ children }) => {
  const [isFlightPanelOpen, setIsFlightPanelOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const toggleFilters = () => setIsFiltersOpen((prev) => !prev);

  const openTable = () => setIsTableOpen(true);
  const closeTable = () => setIsTableOpen(false);

  const openFlightPanel = () => setIsFlightPanelOpen(true);
  const closeFlightPanel = () => setIsFlightPanelOpen(false);
  const toggleFlightPanel = () => setIsFlightPanelOpen((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        isFlightPanelOpen,
        openFlightPanel,
        closeFlightPanel,
        toggleFlightPanel,
        openTable,
        closeTable,
        isTableOpen,
        toggleFilters,
        isFiltersOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
