'use client'

import SubTitleText from '@/components/SubTitleText'

import { Card } from 'flowbite-react'
import { BsInstagram } from 'react-icons/bs'
import { HiOutlineGlobeAlt, HiOutlinePhone } from 'react-icons/hi'
import { useBarDetailStore } from '../../_stores/bar-detail.store'

// TODO: 화면 사이즈에 맞게 레이아웃 조절

export default function BarContact() {
  const barDetail = useBarDetailStore((state) => state.barDetail)
  if (!barDetail) return null

  return (
    <Card>
      <SubTitleText title="연락처 및 정보" />
      <p className="mt-4 flex flex-col gap-2">
        <span className="flex items-center gap-2">
          <HiOutlinePhone size={16} className="text-zinc-500" />
          {barDetail.phone_number}
        </span>
        <span className="flex items-center gap-2">
          <HiOutlineGlobeAlt size={16} className="text-zinc-500" />
          <a className="cursor-pointer text-amber-400 hover:underline">
            {barDetail.website_url}
          </a>
        </span>
        <span className="flex items-center gap-2">
          <BsInstagram size={16} className="text-zinc-500" />
          <a className="cursor-pointer text-amber-400 hover:underline">
            {barDetail.instagram_url}
          </a>
        </span>
      </p>
    </Card>
  )
}
