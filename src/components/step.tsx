import {
  StepDescription,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";

import { StepChildren } from "./steps/step-children";
import { StepChildrenCount } from "./steps/step-children-count";
import { StepIncome } from "./steps/step-income";
import { StepPartner } from "./steps/step-partner";
import { StepSalary } from "./steps/step-salary";
import { StepSpending } from "./steps/step-spendings";
import { StepSummary } from "./steps/step-summary";
import { StepEmployable } from "./steps/step-employable";
import { StepCommunity } from "./steps/step-community";
import { StepAttributes } from "./steps/step-attributes";
import { forwardRef } from "react";
import { TStep } from "@/lib/types";

const stepComponents = {
  ergebnis: (arg) => <StepSummary />,
  kinder: (arg) => <StepChildren />,
  "kinder-anzahl": (arg) => <StepChildrenCount />,
  "monatliche-ausgaben": (arg) => <StepSpending />,
  "monatliches-einkommen": (arg) => <StepSalary />,
  partnerschaft: (arg) => <StepPartner />,
  "weiteres-einkommen": (arg) => <StepIncome />,
  erwerbsfaehig: (arg) => <StepEmployable />,
  bedarfsgemeinschaft: (arg) => <StepCommunity />,
  merkmale: (arg) => <StepAttributes />,
};

export const Step = forwardRef<HTMLDivElement, { id: string; step: TStep }>(
  ({ id, step }, ref) => {
    const StepToRender = stepComponents[id](step);

    return (
      <StepRoot id={id} ref={ref}>
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
        {StepToRender}
      </StepRoot>
    );
  }
);
