"use client"

import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { usePetContext } from "@/lib/hooks";
import { TPetForm, petFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PetFormBtn from "./pet-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: {
      errors
    }
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema)
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return

        onFormSubmission();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE
        petData.age = Number(petData.age)

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
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be more than 2 characters long"
              }
            })}
            id="name"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName", {
              required: "OwnerName is required",
              maxLength: {
                value: 20,
                message: "OwnerName must be less than 20 characters long"
              }
            })}
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
