import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";

export default function Page() {
  return (
    <main>
      <H1 className="mb-4 text-center">Sign Up</H1>

      <AuthForm />

      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <a href="/login" className="font-medium">
          Log in
        </a>

      </p>
    </main>
  )
}
