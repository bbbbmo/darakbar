import BackToListButton from '@/components/ui/buttons/BackToListButton'
import NavigationBar from '@/components/ui/layout/NavBar'

type SubNavBarProps = {
  title: string
  description: string
  children?: React.ReactNode
  href?: string
}

export default function SubNavBar({
  title,
  description,
  children,
  href,
}: SubNavBarProps) {
  return (
    <NavigationBar>
      <div className="flex items-center gap-4">
        {href && <BackToListButton href={href} />}
        <div className="ml-2 flex flex-col gap-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm text-zinc-500">{description}</span>
        </div>
      </div>
      {children}
    </NavigationBar>
  )
}
