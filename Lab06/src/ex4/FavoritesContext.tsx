import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
export interface FavoritesContextType {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  }, []);

  const value = useMemo(
    () => ({
      ids,
      toggle,
      has: (x: string) => ids.includes(x),
    }),
    [ids, toggle]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites phải được sử dụng bên trong một FavoritesProvider");
  }
  return context;
}