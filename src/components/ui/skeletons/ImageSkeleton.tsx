export default function ImageSkeleton({
  width = 100,
  height = 100,
  className = '',
}: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300 ${className}`}
      style={{ width, height }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-gray-400"></div>
      </div>
    </div>
  )
}
