"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet)
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data."
    }
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {

  const validatedId = petIdSchema.safeParse(petId);
  
  const validatedPet = petFormSchema.safeParse(newPetData)
  if (!validatedId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data."
    }
  }
  
  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const validatedId = petIdSchema.safeParse(petId);

  if (!validatedId.success) {
    return {
      message: "Somthing went wrong."
    }
  }
  
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
  } catch (error) {
    return {
      message: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}
