import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";

export default function Page() {
  return (
    <main>
      <H1 className="mb-4 text-center">Login</H1>

      <AuthForm type="login" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <a href="/signup" className="font-medium">
          Sign up
        </a>

      </p>
    </main>
  )
}
