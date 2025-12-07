import { queries } from '@/api/queries'
import FormItem from '@/components/ui/forms/FormItem'
import FormOption from '@/components/ui/forms/FormOption'
import SubTitleText from '@/components/ui/text/SubTitleText'
import { useQuery } from '@tanstack/react-query'
import { Card, Textarea, TextInput } from 'flowbite-react'

export default function PostInputs() {
  return (
    <Card>
      <SubTitleText title="게시글 정보" />
      <FormItem label="제목" required>
        <TextInput
          type="text"
          color="primary"
          placeholder="제목을 입력해주세요"
        />
      </FormItem>
      <FormItem label="내용" required>
        <Textarea color="primary" placeholder="자세한 내용을 입력해주세요" />
      </FormItem>
      {/* <FormItem label="이미지" required>
      <FormFileInput
        registeration={register('images')}
        setValue={setValue}
        trigger={trigger}
      />
    </FormItem> */}
    </Card>
  )
}
