"use client"

import { addPet, editPet } from "@/actions/actions";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  return (
    <form action={async (formData) => {
      if (actionType === "add") {
        const error = await addPet(formData);
        if(error) {
          toast.warning(error.msg)
          return;
        }
      }
      if (actionType === "edit") {
        const error = await editPet(selectedPet!.id, formData);
        if(error) {
          toast.warning(error.msg)
          return;
        }
      }
      onFormSubmission();
    }} className="flex flex-col">
      <div className=" space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" type="text" required
          defaultValue={actionType === "edit" ? selectedPet?.name : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input name="ownerName" id="ownerName" type="text" required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input name="imageUrl" id="imageUrl" type="text" defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}/>
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input name="age" id="age" type="number" required defaultValue={actionType === "edit" ? selectedPet?.age : ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea name="notes" id="notes" rows={3} required defaultValue={actionType === "edit" ? selectedPet?.notes : ""}/>
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  )
}
