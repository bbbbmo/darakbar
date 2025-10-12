'use client'

import { basicTheme } from '@/lib/flowbite/themes/basicTheme'
import { Button, Card, TextInput } from 'flowbite-react'
import { HiAdjustments } from 'react-icons/hi'
import { barFilterSelect } from './BarFilter.const'
import FormOption from '@/components/Forms/FormOption'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useBarFilterStore } from '../_stores/bar-filter.store'

export default function BarFilter() {
  const { name, setName, resetFilters } = useBarFilterStore()

  return (
    <Card>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2">
          <HiAdjustments className="h-6 w-6 text-amber-500" />
          필터 및 정렬
          <Button className="ml-auto" size="sm" onClick={resetFilters}>
            필터 초기화
          </Button>
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <TextInput
            theme={basicTheme.textInput}
            color="primary"
            icon={MagnifyingGlassIcon}
            placeholder="바 이름 검색"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {barFilterSelect.map((select) => (
            <FormOption key={select.key} options={select.options} />
          ))}
        </div>
      </section>
      <p className="text-center text-gray-300">0개의 바가 검색되었습니다.</p>
    </Card>
  )
}
