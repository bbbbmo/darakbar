import MainFooter from '@/app/(main)/_components/MainFooter'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <MainFooter />
    </div>
  )
}
