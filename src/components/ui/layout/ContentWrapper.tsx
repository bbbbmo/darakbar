import clsx from 'clsx'

type ContentWrapperProps = {
  children: React.ReactNode
  className?: string
}

export default function ContentWrapper({
  children,
  className,
}: ContentWrapperProps) {
  return (
    <div className={clsx('mt-10 flex flex-col px-15 xl:px-[5vw]', className)}>
      {children}
    </div>
  )
}
