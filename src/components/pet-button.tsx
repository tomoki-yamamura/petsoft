"use client"

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode
  onClick?: () => void;
  disabled?: boolean
}

export default function PetButton({ actionType, children, disabled, onClick }: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant={"secondary"}>{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "add" ? "Add a new pet" : "Edit pet"}</DialogTitle>
          </DialogHeader>
          <PetForm actionType={actionType} onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false)
            })
          }} />
        </DialogContent>
      </Dialog>
    )
  }

  if (actionType === "checkout") {
    return <Button disabled={disabled} variant={"secondary"} onClick={onClick}>{children}</Button>
  }
}
