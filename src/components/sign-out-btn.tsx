"use client"
import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";

export default function SignOutBtn() {
  return (
    <Button onClick={async () => logOut()}>Sign out</Button>
  )
}
