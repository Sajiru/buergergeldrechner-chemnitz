"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { strict as assert } from "assert";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Alter Code
  /* 
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
      assert(
        process.env.NEXT_PUBLIC_FATHOM_ID !== undefined,
        "No env var for fathom found."
      );
      load(process.env.NEXT_PUBLIC_FATHOM_ID, {
        auto: false,
      });
    }
  }, []);
  */
  // Alter Code

useEffect(() => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    const fathomID = process.env.NEXT_PUBLIC_FATHOM_ID;
    if (!fathomID || fathomID === "dummy") {
      console.warn("Fathom not configured; skipping Fathom initialization.");
      return; // Fathom-Initialisierung überspringen
    }
    load(fathomID, {
      auto: false,
    });
  }
}, []);

  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams?.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export function FathomAnalytics() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
