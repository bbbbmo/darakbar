'use client'

import { useParseFile } from '@/hooks/useParseFile'
import { FileInput, Label } from 'flowbite-react'
import { useEffect, useId, useState } from 'react'
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'

type FormFileInputProps = {
  className?: string
  registeration: UseFormRegisterReturn
  setValue: UseFormSetValue<any>
  trigger: UseFormTrigger<any>
  existingImages?: string[] // 기존 이미지 URL 배열 추가
}

export default function FormFileInput({
  className,
  registeration,
  setValue,
  trigger,
  existingImages = [],
}: FormFileInputProps) {
  const uniqueId = useId()
  const dropzoneId = `dropzone-file-${uniqueId}`
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { publicUrls: existingImagePreviews } = useParseFile(existingImages)

  const removeExistingImage = (index: number) => {
    const updatedImages = existingImages?.filter((_, i) => i !== index)
    setValue('existingImages', updatedImages)
  }

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    if (files.length > 0) {
      const previewUrl = URL.createObjectURL(files[0])
      console.log(previewUrl)
      setImagePreview(previewUrl)
      setValue(registeration.name, files) // 배열로 설정
      await trigger(registeration.name as any)
    } else {
      setValue(registeration.name, null) // 파일이 없으면 null
      await trigger(registeration.name as any)
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {/* 기존 이미지들 표시 */}
      {existingImagePreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {existingImagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`기존 이미지 ${index + 1}`}
                className="h-24 w-full rounded object-cover"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={`flex w-full items-center justify-center ${className}`}>
        <Label
          htmlFor={dropzoneId}
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700 hover:bg-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {imagePreview ? (
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">이미지를 클릭</span> 또는 드래그
                앤 드롭하여 업로드
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG (MAX. 800x400px)
              </p>
            </div>
          )}
          <FileInput
            id={dropzoneId}
            className="hidden"
            accept="image/*"
            ref={registeration.ref}
            name={registeration.name}
            onChange={fileChange}
          />
        </Label>
      </div>
    </div>
  )
}
