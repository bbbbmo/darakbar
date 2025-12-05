import FormItem from '@/components/ui/forms/FormItem'
import FormOption from '@/components/ui/forms/FormOption'
import SubTitleText from '@/components/ui/text/SubTitleText'
import { Card, Textarea, TextInput } from 'flowbite-react'
import { menuTypeOptions } from '../_const/menu-type.cont'

export default function NewMenuInputs() {
  return (
    <Card>
      <SubTitleText title="메뉴 정보" />
      <FormItem label="메뉴 유형" required>
        <FormOption options={menuTypeOptions} setOption={() => {}} />
      </FormItem>
      <FormItem label="메뉴 이름" required>
        <TextInput
          type="text"
          color="primary"
          placeholder="메뉴 이름을 입력해주세요"
        />
      </FormItem>
      <FormItem label="메뉴 설명" required>
        <Textarea color="primary" placeholder="메뉴 설명을 입력해주세요" />
      </FormItem>
      <FormItem label="메뉴 가격" required>
        <TextInput
          type="number"
          color="primary"
          placeholder="메뉴 가격을 입력해주세요"
        />
      </FormItem>
    </Card>
  )
}
