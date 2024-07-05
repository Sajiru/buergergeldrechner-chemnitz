type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type TStep = {
  description: string;
  id: string;
  next: (ctx: TStepContext) => number;
  previous: number;
  title: string;
};

export type TStepContext = {
  community: TPerson[];
  isEmployable: boolean;
  isSingle: boolean;
  spendings: {
    rent: number;
    utilities: number;
    heating: number;
    sum: number;
  };
  salary: {
    gross: number;
    net: number;
  };
  income: {
    childBenefit: number;
  };
};

export type TStepsState = {
  context: TStepContext;
  currentStep: number;
  steps: Record<number, TStep>;
};

export type TAction = {
  state?: RecursivePartial<TStepsState>;
  type: "next" | "previous";
};

export type TPersonCommon = {
  name: string;
  isPregnant?: boolean;
  needsSpecialFood?: boolean;
};

export type TAdult = TPersonCommon & {
  type: "adult";
};

export type TChild = TPersonCommon & {
  type: "child";
  age: "0-5" | "6-13" | "14-17" | "18+";
  isInTraining?: boolean;
};

export type TPerson = TAdult | TChild;
