import NavigationBar from '@/components/ui/layout/NavBar'

type PostNavBarProps = {
  text: string
  description: string
  children?: React.ReactNode
}

export default function PostNavBar({
  text,
  description,
  children,
}: PostNavBarProps) {
  return (
    <NavigationBar>
      <div className="ml-2 flex flex-col gap-2">
        <h3 className="text-xl font-bold">{text}</h3>
        <span className="text-sm text-zinc-500">{description}</span>
      </div>
      {children}
    </NavigationBar>
  )
}
