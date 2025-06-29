import { useState } from "react";
import { FunnelStep, funnelSteps } from "../_components/create-form.const";

const useFunnelStep = () => {
  const [currentStep, setCurrentStep] = useState<FunnelStep>(
    funnelSteps.재료입력,
  );
  const [stepIndex, setStepIndex] = useState<number>(0);
  const maxStep = Object.keys(funnelSteps).length - 1;

  const handleNextStep = () => {
    const nextStep = currentStep.getNextStep();
    if (nextStep && stepIndex < maxStep) {
      setCurrentStep(nextStep);
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    const prevStep = currentStep.getPrevStep();
    if (prevStep && stepIndex > 0) {
      setCurrentStep(prevStep);
      setStepIndex(stepIndex - 1);
    }
  };

  return { currentStep, maxStep, stepIndex, handleNextStep, handlePrevStep };
};

export default useFunnelStep;
