import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — IntegracionInmobiliaria.com",
};

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">
        Sobre nosotros
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        IntegracionInmobiliaria.com nace para conectar lotes con las etapas y
        los actores que necesita un proyecto inmobiliario para avanzar.
        Creemos en calidad sobre cantidad: la tecnología da visibilidad de
        oportunidades, y donde el proyecto lo amerita, intervenimos
        directamente para estructurarlo, conseguir capital y llevarlo a
        buen término.
      </p>
    </div>
  );
}
