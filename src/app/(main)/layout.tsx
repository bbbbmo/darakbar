import MainFooter from '@/app/(main)/_components/MainFooter'
import MainNavBar from './_components/MainNavBar'

export default function MainLayout({
  children,
  recipeModal,
}: {
  children: React.ReactNode
  recipeModal: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavBar />
      <div className="mt-10 flex flex-1 flex-col gap-10 px-15 xl:px-[5vw]">
        {children}
      </div>
      {recipeModal}
      <MainFooter />
    </div>
  )
}
