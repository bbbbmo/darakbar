import AppFooter from '@/components/ui/layout/Footer'
import AppNavBar from '@/components/ui/layout/NavBar/NavBar'

export default function MainLayout({
  children,
  recipeModal,
}: {
  children: React.ReactNode
  recipeModal: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavBar />
      <div className="mt-10 flex flex-1 flex-col gap-10 px-15 xl:px-[5vw]">
        {children}
      </div>
      {recipeModal}
      <AppFooter />
    </div>
  )
}
