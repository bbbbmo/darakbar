import React from "react";
import IngredientForm from "./_components/Forms/IngredientForm";
import BasicInfoForm from "./_components/Forms/BasicInfoForm";
import DescriptionForm from "./_components/Forms/DescriptionForm";
import SuccessCreate from "./_components/Forms/SuccessCreate";
import { FieldPath } from "react-hook-form";
import { CreateRecipeForm } from "./RecipeCreateModal.schemes";

export const unitOptions = [
  { value: "oz", label: "oz" },
  { value: "ml", label: "ml" },
  { value: "티스푼", label: "티스푼" },
  { value: "스푼", label: "스푼" },
  { value: "개", label: "개" },
] as const;

export const emptyIngredient = {
  name: "",
  amount: 0,
  unit: "oz",
};

export type FunnelStep = {
  component: React.FC;
  nextText: string;
  prevText?: string;
  getNextStep: () => FunnelStep | null;
  getPrevStep: () => FunnelStep | null;
  fieldsToValidate: FieldPath<CreateRecipeForm>[];
  isFinal?: boolean;
};

const NEXT = "다음 단계";
const PREV = "이전 단계";

// 각 단계 객체 정의
export const 재료입력: FunnelStep = {
  component: IngredientForm,
  nextText: NEXT,
  getNextStep: () => 기본정보입력,
  getPrevStep: () => null,
  fieldsToValidate: [
    "baseLiquor.name",
    "baseLiquor.amount",
    "baseLiquor.unit",
    "ingredients",
  ],
};

export const 기본정보입력: FunnelStep = {
  component: BasicInfoForm,
  nextText: NEXT,
  prevText: PREV,
  getNextStep: () => 설명입력,
  getPrevStep: () => 재료입력,
  fieldsToValidate: ["name", "image", "glassType"],
};

export const 설명입력: FunnelStep = {
  component: DescriptionForm,
  nextText: "칵테일 등록하기",
  prevText: PREV,
  getNextStep: () => 레시피등록완료,
  getPrevStep: () => 기본정보입력,
  fieldsToValidate: ["description", "instructions"],
};

export const 레시피등록완료: FunnelStep = {
  component: SuccessCreate,
  nextText: "확인하러 가기",
  getNextStep: () => null,
  getPrevStep: () => null,
  fieldsToValidate: [],
  isFinal: true,
};

export const funnelSteps: Record<string, FunnelStep> = {
  재료입력,
  기본정보입력,
  설명입력,
  레시피등록완료,
} as const;
