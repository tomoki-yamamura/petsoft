"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(formData) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      msg: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId, formData) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        age: parseInt(formData.get("age")),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      msg: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      msg: "something went wrong",
    };
  }
  revalidatePath("/app", "layout");
}
