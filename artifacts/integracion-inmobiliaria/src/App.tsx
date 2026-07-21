import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

import HomePage from '@/app/page';
import LotesPage from '@/app/lotes/page';
import LoteDetallePage from '@/app/lotes/[slug]/page';
import MapaPage from '@/app/mapa/page';
import OportunidadesPage from '@/app/oportunidades/page';
import ActoresPage from '@/app/actores/page';
import ActorPerfilPage from '@/app/actores/[id]/page';
import EtapasPage from '@/app/etapas/page';
import RescatePage from '@/app/rescate/page';
import ComoFuncionaPage from '@/app/como-funciona/page';
import SobreNosotrosPage from '@/app/sobre-nosotros/page';
import ContactoPage from '@/app/contacto/page';
import PublicarLotePage from '@/app/publicar-lote/page';

function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="text-[var(--muted)]">La página que buscas no existe.</p>
      <a href="/" className="w-fit rounded-full bg-[var(--brand)] px-6 py-2 text-sm font-medium text-[var(--brand-foreground)] hover:opacity-90">
        Volver al inicio
      </a>
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-1 flex-col">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/lotes" component={LotesPage} />
        <Route path="/lotes/:slug">
          {(params) => <LoteDetallePage slug={params.slug || ''} />}
        </Route>
        <Route path="/mapa" component={MapaPage} />
        <Route path="/oportunidades" component={OportunidadesPage} />
        <Route path="/actores" component={ActoresPage} />
        <Route path="/actores/:id">
          {(params) => <ActorPerfilPage id={params.id || ''} />}
        </Route>
        <Route path="/etapas" component={EtapasPage} />
        <Route path="/rescate" component={RescatePage} />
        <Route path="/como-funciona" component={ComoFuncionaPage} />
        <Route path="/sobre-nosotros" component={SobreNosotrosPage} />
        <Route path="/contacto" component={ContactoPage} />
        <Route path="/publicar-lote" component={PublicarLotePage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Router />
      </main>
      <Footer />
    </WouterRouter>
  );
}

export default App;
