import { logIn, signUp } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import prisma from "@/lib/db";

type AuthFormProps = {
  type: "signup" | "login"
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form
      action={ type === "login" ? logIn : signUp}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="mb-4 space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      {type === "login" ? <Button>Log in</Button> : <Button>Sign Up</Button>}
    </form>
  )
}
