import type { Metadata } from "next";
import { Providers } from "./providers"; 

export const metadata: Metadata = {
  title: "Task Master",
  description: "Todo App built with Chakra UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
