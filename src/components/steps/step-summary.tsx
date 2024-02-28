"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CheckCircle2Icon,
  ChevronsUpDownIcon,
} from "lucide-react";

import { Separator } from "../ui/separator";

export function StepSummary() {
  const dispatch = useStepsDispatch();
  const { context } = useSteps();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {},
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <div className="flex justify-between items-center p-4 mb-4 bg-green-100 rounded-lg border border-green-300">
          <div>
            <div className="text-sm">Ihr möglicher Bürgergeld-Anspruch</div>
            <div className="text-xl font-bold">500,00€</div>
          </div>
          <CheckCircle2Icon className="text-green-600" />
        </div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              className="flex  justify-between w-full"
              type="button"
              variant="outline"
            >
              <div>Ihre Eingaben</div>
              <ChevronsUpDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 text-sm px-2 py-4">
              <div className="flex justify-between">
                <div className="font-bold">
                  Leben Sie in einer Partnerschaft?
                </div>
                <div className="font-bold">
                  {context.partnerschaft ? "Ja" : "Nein"}
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="font-bold">Haben Sie Kinder?</div>
                <div className="font-bold">
                  {context.kinder?.length ? "Ja" : "Nein"}
                </div>
              </div>
              {context.kinder?.map((kind, index) => (
                <div className="flex justify-between pl-2 border-l" key={index}>
                  <div>{index + 1}.Kind</div>
                  <div>{kind}</div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <div className="font-bold">Ihre monatlichen Ausgaben</div>
                <div className="font-bold">800,00€</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Heizkosten</div>
                <div>{context.ausgaben.heizkosten}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Kaltmiete</div>
                <div>{context.ausgaben.kaltmiete}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Nebenkosten</div>
                <div>{context.ausgaben.nebenkosten}</div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="font-bold">Ihre monatlichen Einnahmen</div>
                <div className="font-bold">800,00€</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Antragsteller (Brutto)</div>
                <div>{context.einkommen.antragsteller.brutto}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Antragsteller (Netto)</div>
                <div>{context.einkommen.antragsteller.netto}</div>
              </div>
              {context.partnerschaft && (
                <>
                  <div className="flex justify-between pl-2 border-l">
                    <div>Partner (Brutto)</div>
                    <div>{context.einkommen.partner.brutto}</div>
                  </div>
                  <div className="flex justify-between pl-2 border-l">
                    <div>Partner (Netto)</div>
                    <div>{context.einkommen.partner.netto}</div>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex justify-between">
                <div className="font-bold">Sonstige monatlichen Einnahmen</div>
                <div className="font-bold">800,00€</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Arbeitslosengeld</div>
                <div>{context.einkommen.antragsteller.arbeitslosengeld}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Elterngeld</div>
                <div>{context.einkommen.antragsteller.elterngeld}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Kindergeld</div>
                <div>{context.einkommen.antragsteller.kindergeld}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Rente</div>
                <div>{context.einkommen.antragsteller.rente}</div>
              </div>
              <div className="flex justify-between pl-2 border-l">
                <div>Sonstiges</div>
                <div>{context.einkommen.antragsteller.sonstiges}</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </StepContent>
      <StepNavigation>
        <Button onClick={() => dispatch({ type: "previous" })} type="button">
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <Button className="grow sm:grow-0 sm:w-48 " type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
