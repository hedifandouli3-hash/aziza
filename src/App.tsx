import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Lazy loaded page components for optimal performance and chunk splitting
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CataloguesPage = lazy(() => import('./pages/CataloguesPage').then((m) => ({ default: m.CataloguesPage })));
const CatalogueReaderPage = lazy(() => import('./pages/CatalogueReaderPage').then((m) => ({ default: m.CatalogueReaderPage })));
const StoresPage = lazy(() => import('./pages/StoresPage').then((m) => ({ default: m.StoresPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Scroll to top automatically on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Subtle fallback loader
const PageFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-gray-200 border-t-[#E30613] rounded-full animate-spin" />
      <span className="text-xs font-semibold text-gray-400">Chargement...</span>
    </div>
  </div>
);

// App Layout with conditional compact header for dedicated catalogue reader
const AppLayout: React.FC = () => {
  const { pathname } = useLocation();
  // Dedicated catalogue viewer routes: /catalogues/:id (e.g. /catalogues/catalogue-octobre-2026)
  const isDedicatedReader = pathname.startsWith('/catalogues/') && pathname !== '/catalogues';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      {/* Hide full oversized header on dedicated reader page to maximize reading viewport */}
      {!isDedicatedReader && <Header />}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produits" element={<ProductsPage />} />
            <Route path="/produits/:id" element={<ProductDetailPage />} />
            <Route path="/catalogues" element={<CataloguesPage />} />
            <Route path="/catalogues/:id" element={<CatalogueReaderPage />} />
            <Route path="/magasins" element={<StoresPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Hide full footer on dedicated reader page */}
      {!isDedicatedReader && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <StoreProvider>
          <ScrollToTop />
          <AppLayout />
        </StoreProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
