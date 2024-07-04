"use client"

import { Pet } from "@/lib/types";
import { createContext, useState } from "react"

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[]
}

type TPetContext = {
  pets: Pet[],
  selectedPetId: string | null;
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({ children, data }: PetContextProviderProps) {
  const [pets, setPets] = useState(data)
  const [selectedPetId, seSelectedPetId] = useState(null)

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
