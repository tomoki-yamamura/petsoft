import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
}

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  const { pending } = useFormStatus();
  
  return (
    <Button disabled={pending} className="mt-5 self-end" type="submit">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  )
}
