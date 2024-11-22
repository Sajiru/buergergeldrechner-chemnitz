import { ThemeProvider } from "@/components/theme-provider";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";
import { SiteHeader } from "@/components/header";
import { ReactNode } from "react";

export const metadata = {
  description:
    "Der Bürgergeldrechner der Stadt Leipzig hilft Ihnen, schnell und einfach zu berechnen, ob Sie Anspruch auf Bürgergeld haben. Nutzen Sie unser benutzerfreundliches Tool, um Ihre finanzielle Unterstützung zu prüfen und wichtige Informationen zur Antragstellung zu erhalten.",
  title: "Bürgergeldrechner der Stadt Leipzig",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="" lang="de" suppressHydrationWarning>
      {/* Suppress input zooming on mobile devices. */}
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        name="viewport"
      />
      <body
        className={cn(
          "min-h-screen bg-muted/40 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
