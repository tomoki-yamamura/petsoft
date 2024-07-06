"use client"

import { usePetContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    formState: {
      isSubmitting,
      errors
    }
  } = useForm<TPetForm>();

  return (
    <form action={async (formData) => {
      onFormSubmission();

      const petData = {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: (formData.get("imageUrl") as string) || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: Number(formData.get("age") as string),
        notes: formData.get("notes") as string,
      }
      if (actionType === "add") {
        handleAddPet(petData)
      } else if (actionType === "edit") {
        handleEditPet(selectedPet!.id, petData)
      }
    }} className="flex flex-col">
      <div className=" space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
          />
          {errors.ownerName && <span className="text-red-500">{errors.ownerName.message}</span>}

        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register("imageUrl")}
          />
          {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}

        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age")}
          />
          {errors.age && <span className="text-red-500">{errors.age.message}</span>}

        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
          />
          {errors.notes && <span className="text-red-500">{errors.notes.message}</span>}
        </div>

      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  )
}
