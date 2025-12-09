import clsx from 'clsx'
import { Dropdown, DropdownItem } from 'flowbite-react'
import {
  HiDotsHorizontal,
  HiDotsVertical,
  HiPencil,
  HiTrash,
} from 'react-icons/hi'

type ActionMenuProps = {
  className?: string
  placement?: 'bottom' | 'top' | 'left' | 'right'
  vertical?: boolean
  onEdit: () => void
  onDelete: () => void
  children?: React.ReactNode
}

export default function ActionMenu({
  className,
  placement = 'bottom',
  vertical = false,
  onEdit,
  onDelete,
  children,
}: ActionMenuProps) {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      placement={placement}
      label={
        vertical ? (
          <HiDotsVertical
            className={clsx('cursor-pointer', className)}
            size={24}
          />
        ) : (
          <HiDotsHorizontal
            className={clsx('cursor-pointer', className)}
            size={24}
          />
        )
      }
    >
      <DropdownItem icon={HiPencil} onClick={onEdit}>
        수정
      </DropdownItem>
      <DropdownItem icon={HiTrash} onClick={onDelete}>
        삭제
      </DropdownItem>
      {children}
    </Dropdown>
  )
}
