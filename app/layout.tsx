import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Isla · Escape Room",
  description:
    "Apareces en una isla. No sabes cómo has llegado. La única forma de salir es averiguar cómo lo hiciste. Escape room interactivo con varias historias y niveles de dificultad.",
};

export const viewport: Viewport = {
  themeColor: "#0a2a5e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="ocean-bg" />
        <div className="ocean-glow" />
        <div className="waves animate-wave" />
        <div className="waves waves-2 animate-wave" />
        {children}
      </body>
    </html>
  );
}
