"use client";

import { Province } from "@/type/province";
import { createContext, ReactNode, useContext } from "react";

type LocationProviderProps = {
    value: Province[];
    children: ReactNode;
};

const LocationContext = createContext<Province[]>([]);

export function LocationProvider({ value, children }: LocationProviderProps) {
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocations() {
  return useContext(LocationContext);
}
