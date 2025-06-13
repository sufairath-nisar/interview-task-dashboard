import type { Metadata } from "next";
import "../globals.css"; 
import Providers from "@/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JSONPlaceholder Dashboard",
  description: "CRUD demo using Next.js, TailwindCSS, React Query, shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" /> 
        </Providers>
      </body>
    </html>
  );
}
