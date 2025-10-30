import { Children, ReactElement, isValidElement, useState } from 'react'

type StepProps = {
  name: string
  children: React.ReactNode
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep)

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>
  }

  const Funnel = (props: {
    children: React.ReactNode
  }): ReactElement | null => {
    const childrenArray = Children.toArray(props.children) // 모든 자식 배열로 변환
    const targetStep = childrenArray.find((child) => {
      return (
        isValidElement(child) && // 자식이 ReactElement인지 확인
        (child.props as { name?: string }).name === step // 자식의 name 속성이 step과 일치하는지 확인
      )
    }) as ReactElement | undefined
    return <>{targetStep}</>
  }

  return { Funnel, Step, setStep, step }
}
