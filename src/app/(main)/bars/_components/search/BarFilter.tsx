'use client'

import { Button, Card, Select, TextInput } from 'flowbite-react'
import { HiAdjustments, HiOutlineSearch } from 'react-icons/hi'
import { BarFilterOption, BarSortOption } from '@/api/bar/getBars'
import { useState } from 'react'
import { barSortOptions, regionOptions } from '@/const/bar-options.const'
import { useTagStore } from '@/stores/tag.store'

type BarFilterProps = {
  children: React.ReactNode
  onChangeFilter: (filter: BarFilterOption) => void
  onChangeSort: (sort: BarSortOption) => void
}

export default function BarFilter({
  children,
  onChangeFilter,
  onChangeSort,
}: BarFilterProps) {
  const [name, setName] = useState<string>('')
  const [selectedAtmosphereId, setSelectedAtmosphereId] = useState<
    number | null
  >(null)
  const [selectedRegion, setSelectedRegion] = useState<string>(regionOptions[0])
  const [selectedSortOption, setSelectedSortOption] = useState<BarSortOption>(
    barSortOptions[0].value,
  )

  const atmospheres = useTagStore((state) => state.atmosphereTags)

  const handleSearch = () => {
    onChangeFilter({
      name: name || undefined,
      atmosphere: selectedAtmosphereId ? [selectedAtmosphereId] : undefined,
      region: selectedRegion || undefined,
    })

    onChangeSort(selectedSortOption)
  }

  const handleReset = () => {
    setName('')
    setSelectedAtmosphereId(null)
    setSelectedRegion(regionOptions[0])
    setSelectedSortOption(barSortOptions[0].value)
  }

  return (
    <Card>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2">
          <HiAdjustments className="h-6 w-6 text-amber-500" />
          필터 및 정렬
          <div className="ml-auto flex gap-2">
            <Button size="sm" onClick={handleReset}>
              필터 초기화
            </Button>
            <Button
              className="flex gap-2 font-semibold"
              size="sm"
              color="primary"
              onClick={handleSearch}
            >
              <HiOutlineSearch />
              조회
            </Button>
          </div>
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <TextInput
            color="primary"
            icon={HiOutlineSearch}
            placeholder="바 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            color="primary"
            value={selectedAtmosphereId || undefined}
            onChange={(e) => setSelectedAtmosphereId(Number(e.target.value))}
          >
            <option> 모든 분위기 </option>
            {atmospheres.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <Select
            color="primary"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            color="primary"
            onChange={(e) =>
              setSelectedSortOption(e.target.value as BarSortOption)
            }
          >
            {barSortOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        {children}
      </section>
    </Card>
  )
}
