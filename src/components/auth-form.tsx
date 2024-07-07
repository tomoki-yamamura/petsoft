"use client"
import { logIn, signUp } from "@/actions/actions";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "signup" | "login"
}

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, null);
  const [logInError, dispatchLogIn] = useFormState(logIn, null);
  
  return (
    <form
      action={type === "login" ? dispatchLogIn : dispatchSignUp}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="mb-4 space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>}
      {logInError && <p className="text-red-500 text-sm mt-2">{logInError.message}</p>}
    </form>
  )
}
