import FormItem from '@/components/ui/forms/FormItem'
import TimePicker from '@/components/ui/TimePicker'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react'
import { BarRegisterForm } from '../BarRegister.schemes'
import { UseFormSetValue } from 'react-hook-form'
import { useState } from 'react'
import { defaultBusinessHour } from '../BarRegister.const'

type ApplySameBusinessHourModalProps = {
  open: boolean
  onClose: () => void
  setValue: UseFormSetValue<BarRegisterForm>
}

export default function ApplySameBusinessHourModal({
  open,
  onClose,
  setValue,
}: ApplySameBusinessHourModalProps) {
  const WEEK_LENGTH = 7

  const [businessHour, setBusinessHour] = useState(
    structuredClone(defaultBusinessHour),
  )

  const updateBusinessHour = (
    field: 'openTime' | 'closeTime' | 'lastOrderTime',
    value: string,
  ) => {
    setBusinessHour((prev) => ({ ...prev, [field]: value }))
  }

  const applyBusinessHour = () => {
    for (let i = 0; i < WEEK_LENGTH; i++) {
      setValue(`businessHours.${i}.openTime`, businessHour.openTime)
      setValue(`businessHours.${i}.closeTime`, businessHour.closeTime)
      setValue(`businessHours.${i}.lastOrderTime`, businessHour.lastOrderTime)
    }
    onClose()
  }

  return (
    <Modal show={open} onClose={onClose} size="xl">
      <ModalHeader className="bg-primary">
        <span className="text-2xl font-bold">동일한 영업 정보 적용</span>
      </ModalHeader>
      <ModalBody className="bg-primary">
        <FormItem label="시작">
          <TimePicker
            required
            value={businessHour.openTime}
            setValue={(value) => updateBusinessHour('openTime', value)}
          />
        </FormItem>
        <FormItem label="마감">
          <TimePicker
            required
            value={businessHour.closeTime}
            setValue={(value) => updateBusinessHour('closeTime', value)}
          />
        </FormItem>
        <FormItem label="라스트 오더">
          <TimePicker
            required
            value={businessHour.lastOrderTime}
            setValue={(value) => updateBusinessHour('lastOrderTime', value)}
          />
        </FormItem>
      </ModalBody>
      <ModalFooter className="bg-primary">
        <div className="ml-auto flex gap-2">
          <Button onClick={onClose} size="sm">
            취소
          </Button>
          <Button color="primary" size="sm" onClick={applyBusinessHour}>
            적용
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
