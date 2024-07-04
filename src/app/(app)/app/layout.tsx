import BackgroundPattern from "@/components/BackgroundPattern"
import AppFooter from "@/components/app-footer"
import AppHeader from "@/components/app-header"

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1080px] mx-auto">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  )
}
