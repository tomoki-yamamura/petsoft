"use client";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react"
import { addPet, deletePet, editPet } from "@/actions/actions";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[]
}

type TPetContext = {
  pets: Pet[],
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ children, data }: PetContextProviderProps) {

  const [optimisticPets, setoptimisticPets] = useOptimistic(data, (state, newPet) => {
    return [...state, {
      id: Math.random().toString(),
      ...newPet
    }];
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setoptimisticPets(newPet)
    const error = await addPet(newPet)
    if (error) {
      toast.warning(error.msg)
      return
    }
  }

  const handleEditPet = async (petId: string, petData: Omit<Pet, "id">) => {
    const error = await editPet(petId, petData);
    if (error) {
      toast.warning(error.msg)
      return;
    }
  }

  const handleCheckoutPet = async (petId: string) => {
    await deletePet(petId)
    setSelectedPetId(null)
  }

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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

