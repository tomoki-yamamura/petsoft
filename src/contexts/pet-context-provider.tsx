"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react"
// import { addPet } from "@/actions/actions";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[]
}

type TPetContext = {
  pets: Pet[],
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleCheckoutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ children, data: pets }: PetContextProviderProps) {

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length;

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets(prev => [...prev, {
    //   id: Date.now().toString(),
    //   ...newPet
    // }])
    await addPet
  }

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    // setPets((prev) => prev.map((pet) => {
    //   if (pet.id === petId) {
    //     return {
    //       ...pet,
    //       ...newPetData
    //     }
    //   }
    //   return pet;
    // })
    // )
  }

  const handleCheckoutPet = (id: string) => {
    // setPets(prev => prev.filter(pet => pet.id !== id))
    // setSelectedPetId(null)
  }

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
function addPet() {
  throw new Error("Function not implemented.");
}

