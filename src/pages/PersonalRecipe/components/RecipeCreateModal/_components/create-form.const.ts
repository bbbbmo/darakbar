import React from "react";
import IngredientForm from "./IngredientForm";
import BasicInfoForm from "./BasicInfoForm";
import DescriptionForm from "./DescriptionForm";
import SuccessCreate from "./SuccessCreate";

export const unitOptions = [
  { value: "oz", label: "oz" },
  { value: "ml", label: "ml" },
  { value: "티스푼", label: "티스푼" },
  { value: "스푼", label: "스푼" },
  { value: "개", label: "개" },
];

export const emptyIngredient = {
  name: "",
  amount: 0,
  unit: "",
};

type StepProps = {
  onNext: () => void;
  setSubmitHandler: (handler: () => void) => void;
};

export type FunnelStep = {
  component: React.FC<StepProps>;
  nextText: string;
  prevText?: string;
  getNextStep: () => FunnelStep | null;
  getPrevStep: () => FunnelStep | null;
};

const NEXT = "다음 단계";
const PREV = "이전 단계";

// 각 단계 객체 정의
export const 재료입력: FunnelStep = {
  component: IngredientForm,
  nextText: NEXT,
  getNextStep: () => 기본정보입력,
  getPrevStep: () => null,
};

export const 기본정보입력: FunnelStep = {
  component: BasicInfoForm,
  nextText: NEXT,
  prevText: PREV,
  getNextStep: () => 설명입력,
  getPrevStep: () => 재료입력,
};

export const 설명입력: FunnelStep = {
  component: DescriptionForm,
  nextText: "칵테일 등록하기",
  prevText: PREV,
  getNextStep: () => 레시피등록완료,
  getPrevStep: () => 기본정보입력,
};

export const 레시피등록완료: FunnelStep = {
  component: SuccessCreate,
  nextText: "확인하러 가기",
  getNextStep: () => null,
  getPrevStep: () => null,
};

export const funnelSteps: Record<string, FunnelStep> = {
  재료입력,
  기본정보입력,
  설명입력,
  레시피등록완료,
};
