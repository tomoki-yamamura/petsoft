import BackgroundPattern from "@/components/BackgroundPattern"
import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"
import { Toaster } from "@/components/ui/sonner"
import PetContextProvider from "@/contexts/pet-context-provider"
import SearchContextProvider from "@/contexts/search-context-provider"
import prisma from "@/lib/db"
import { checkAuth } from "@/lib/server-utils"

export default async function Layout({ children }: {
  children: React.ReactNode
}) {

  const session = await checkAuth();

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1080px] mx-auto px-2 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets} >
            {children}
          </PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  )
}

