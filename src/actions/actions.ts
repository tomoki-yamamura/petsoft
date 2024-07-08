"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            message: "Invalid credentials"
          }
        }
        default: {
          return {
            message: "Could not sign in"
          }
        }
      }
    }

    throw error;
  }
}

export async function logOut() {
  await signOut({
    redirectTo: "/",
  });
}

export async function signUp(prevState: unknown, formData: unknown) {
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  const formDataEntries = Object.fromEntries(formData.entries());

  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }
  }

  await signIn("credentials", validatedFormData.data);
}

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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
  const session = await checkAuth();

  const validatedId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  const pet = await getPetById(validatedId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
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
  const session = await checkAuth();

  const validatedId = petIdSchema.safeParse(petId);

  if (!validatedId.success) {
    return {
      message: "Somthing went wrong.",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
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

export async function createCheckoutSession() {
  const session = await checkAuth();
  
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PaJpj2LD0OI5Ah6NPIWus6V",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  
  redirect(checkoutSession.url)
}