"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation";

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);

  redirect("/app/dashboard")
}

export async function logOut() {
  await signOut({
    redirectTo: "/"
  });
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10)
  
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword
    }
  })

  await signIn("credentials", formData)
}

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const validatedPet = petFormSchema.safeParse(pet)
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data."
    }
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    
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
