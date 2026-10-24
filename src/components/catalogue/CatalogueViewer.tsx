import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  Download,
  Check,
  Loader2
} from 'lucide-react';
import { PageFlip } from 'page-flip';
import type { Catalogue } from '../../types';
import { CATALOGUE_PAGES } from '../../data/flyerPages';
import { CatalogueFlyerPage } from './CatalogueFlyerPage';

interface CatalogueViewerProps {
  catalogue: Catalogue;
}

export const CatalogueViewer: React.FC<CatalogueViewerProps> = ({ catalogue }) => {
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0-indexed
  const [isPortrait, setIsPortrait] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bookRootRef = useRef<HTMLDivElement>(null);
  const pageFlipInstanceRef = useRef<PageFlip | null>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const totalPages = catalogue.pageCount || CATALOGUE_PAGES.length;
  const activePages = CATALOGUE_PAGES.slice(0, totalPages);

  // Initialize PageFlip instance
  useEffect(() => {
    if (!bookRootRef.current) return;

    let isMounted = true;
    setIsReady(false);
    setCurrentPageIndex(0);

    // Short timeout to guarantee DOM elements are rendered
    const timer = setTimeout(() => {
      if (!bookRootRef.current || !isMounted) return;

      try {
        // Destroy existing instance if any
        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch {
            // ignore
          }
          pageFlipInstanceRef.current = null;
        }

        const pf = new PageFlip(bookRootRef.current, {
          width: 440,
          height: 620,
          size: 'stretch',
          minWidth: 280,
          maxWidth: 580,
          minHeight: 400,
          maxHeight: 820,
          maxShadowOpacity: 0.6,
          showCover: false, // Start with page 1 & 2 open side by side on desktop
          mobileScrollSupport: false,
          usePortrait: true, // Automatically single-page portrait on mobile
          flippingTime: 750,
          useMouseEvents: true,
          clickEventForward: true,
          showPageCorners: true,
          swipeDistance: 25
        });

        const pages = bookRootRef.current.querySelectorAll('.flyer-page-item');
        if (pages.length > 0) {
          pf.loadFromHTML(pages);
        }

        pf.on('flip', (e: { data: number }) => {
          if (isMounted) {
            setCurrentPageIndex(e.data);
          }
        });

        pf.on('changeOrientation', (e: { data: string }) => {
          if (isMounted) {
            setIsPortrait(e.data === 'portrait');
          }
        });

        pf.on('init', () => {
          if (isMounted) {
            setIsReady(true);
            setIsPortrait(pf.getOrientation() === 'portrait');
          }
        });

        pageFlipInstanceRef.current = pf;

        // Fallback readiness trigger
        setTimeout(() => {
          if (isMounted) {
            setIsReady(true);
          }
        }, 150);
      } catch (err) {
        console.error('PageFlip initialization error:', err);
        if (isMounted) {
          setIsReady(true);
        }
      }
    }, 60);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        pageFlipInstanceRef.current = null;
      }
    };
  }, [catalogue.id]);

  // Turn to Next Page
  const handleNext = useCallback(() => {
    if (!pageFlipInstanceRef.current) return;
    try {
      pageFlipInstanceRef.current.flipNext('top');
    } catch {
      pageFlipInstanceRef.current.turnToNextPage();
    }
  }, []);

  // Turn to Previous Page
  const handlePrev = useCallback(() => {
    if (!pageFlipInstanceRef.current) return;
    try {
      pageFlipInstanceRef.current.flipPrev('top');
    } catch {
      pageFlipInstanceRef.current.turnToPrevPage();
    }
  }, []);

  // First page jump
  const handleFirst = useCallback(() => {
    if (!pageFlipInstanceRef.current) return;
    pageFlipInstanceRef.current.turnToPage(0);
    setCurrentPageIndex(0);
  }, []);

  // Last page jump
  const handleLast = useCallback(() => {
    if (!pageFlipInstanceRef.current) return;
    const last = totalPages - 1;
    pageFlipInstanceRef.current.turnToPage(last);
    setCurrentPageIndex(last);
  }, [totalPages]);

  // Direct page jump from thumbnails
  const handleJumpToPage = useCallback((index: number) => {
    if (!pageFlipInstanceRef.current) return;
    try {
      pageFlipInstanceRef.current.flip(index);
    } catch {
      pageFlipInstanceRef.current.turnToPage(index);
    }
  }, []);

  // Fullscreen management
  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Home') {
        handleFirst();
      } else if (e.key === 'End') {
        handleLast();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          navigate('/catalogues');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleFirst, handleLast, exitFullscreen, isFullscreen, navigate]);

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    if (!thumbnailScrollRef.current) return;
    const activeEl = thumbnailScrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentPageIndex]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${catalogue.title} - AZIZA Tunisie`,
          text: `Découvrez les promotions du catalogue ${catalogue.title} AZIZA`,
          url: window.location.href
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 2000);
        })
        .catch(() => {});
    }
  };

  // Bounds checks for disabled states
  const isAtFirst = currentPageIndex === 0;
  const isAtLast = isPortrait
    ? currentPageIndex >= totalPages - 1
    : currentPageIndex >= totalPages - 2;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#0F172A] text-white select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'rounded-3xl shadow-2xl overflow-hidden'
      }`}
    >
      {/* =========================================================================
          REFINED TOP TOOLBAR (AZIZA RED CHEVRONS & SLEEK CONTROLS)
          ========================================================================= */}
      <div className="bg-[#0B1120] px-3 sm:px-6 py-2 sm:py-2.5 border-b border-gray-800 flex items-center justify-between gap-2 sm:gap-4 z-30">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/catalogues')}
            aria-label="Retourner aux catalogues"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-800/90 hover:bg-[#E30613] transition-all flex-shrink-0 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Retour aux catalogues</span>
            <span className="md:hidden">Retour</span>
          </button>
          <div className="border-l border-gray-700/80 pl-2 sm:pl-3 truncate">
            <h2 className="text-xs sm:text-sm font-extrabold text-white leading-tight truncate">
              {catalogue.title}
            </h2>
            <p className="text-[10px] text-gray-400 hidden sm:block truncate">{catalogue.period}</p>
          </div>
        </div>

        {/* Center: REFINED AZIZA RED CHEVRON CONTROLS (|<<  <  PAGE  >  >>|) */}
        <div className="flex items-center gap-1 bg-gray-900/90 px-1 py-0.5 rounded-xl border border-gray-800 shadow-inner flex-shrink-0">
          {/* First Page (|<<) */}
          <button
            type="button"
            onClick={handleFirst}
            disabled={isAtFirst}
            title="Première page (Début)"
            aria-label="Première page"
            className="p-1 rounded-md bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>

          {/* Previous Page (<) */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isAtFirst}
            title="Page précédente (Flèche gauche)"
            aria-label="Page précédente"
            className="p-1 rounded-md bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Page Counter Badge */}
          <div className="px-2 sm:px-3 py-0.5 text-[11px] sm:text-xs font-mono font-bold text-gray-100 whitespace-nowrap min-w-[75px] sm:min-w-[95px] text-center">
            {isPortrait ? (
              <span>
                Page <span className="text-[#E30613] font-black">{currentPageIndex + 1}</span> / {totalPages}
              </span>
            ) : (
              <span>
                Pages{' '}
                <span className="text-[#E30613] font-black">
                  {currentPageIndex + 1}
                  {currentPageIndex + 1 < totalPages ? ` - ${currentPageIndex + 2}` : ''}
                </span>{' '}
                / {totalPages}
              </span>
            )}
          </div>

          {/* Next Page (>) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isAtLast}
            title="Page suivante (Flèche droite)"
            aria-label="Page suivante"
            className="p-1 rounded-md bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Last Page (>>|) */}
          <button
            type="button"
            onClick={handleLast}
            disabled={isAtLast}
            title="Dernière page (Fin)"
            aria-label="Dernière page"
            className="p-1 rounded-md bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Zoom & Utilities */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.85, Number((z - 0.05).toFixed(2))))}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Zoom arrière"
            aria-label="Zoom arrière"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Réinitialiser zoom"
            aria-label="Réinitialiser zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.3, Number((z + 0.05).toFixed(2))))}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Zoom avant"
            aria-label="Zoom avant"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Optional PDF Download: Only shown if a genuine, accessible PDF asset exists */}
          {catalogue.pdfUrl && catalogue.pdfUrl !== '#' && catalogue.pdfUrl !== '' && (
            <a
              href={catalogue.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-300 hover:text-[#E30613] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              title="Ouvrir le catalogue PDF officiel"
              aria-label="Ouvrir le catalogue PDF officiel"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Share button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-gray-300 hover:text-[#E30613] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              title="Partager le catalogue"
              aria-label="Partager le catalogue"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            {copiedToast && (
              <span className="absolute -bottom-8 right-0 bg-[#E30613] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-40 animate-in fade-in flex items-center gap-1">
                <Check className="w-3 h-3" /> Lien copié !
              </span>
            )}
          </div>

          {/* Fullscreen button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
            aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN READING STAGE (CLEAN LIGHT NEUTRAL BACKDROP & 3D PAGE-FLIP CANVAS)
          ========================================================================= */}
      <div className="relative flex-1 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[660px]">
        {/* Subtle loading spinner while page-flip binds DOM canvas */}
        {!isReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#F1F5F9]/80 backdrop-blur-xs">
            <Loader2 className="w-8 h-8 text-[#E30613] animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-600">Chargement du catalogue...</p>
          </div>
        )}

        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isAtFirst}
          aria-label="Pages précédentes"
          className="absolute left-2 sm:left-4 z-25 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-[#E30613] text-gray-800 hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-md border border-gray-200/80 hover:border-[#E30613] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* PageFlip Container with subtle outer paper shadow and zoom scaling */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 200ms ease'
          }}
          className="w-full flex items-center justify-center select-none"
        >
          <div
            ref={bookRootRef}
            className="catalogue-flipbook-root mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] rounded-xl overflow-hidden bg-white"
          >
            {activePages.map((page, index) => (
              <div
                key={page.pageNumber}
                className="flyer-page-item bg-[#FAF9F5] overflow-hidden"
                data-density={index === 0 || index === totalPages - 1 ? 'hard' : 'soft'}
              >
                <CatalogueFlyerPage
                  page={page}
                  pageNumber={index + 1}
                  totalPages={totalPages}
                  catalogueTitle={catalogue.title}
                  cataloguePeriod={catalogue.period}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isAtLast}
          aria-label="Pages suivantes"
          className="absolute right-2 sm:right-4 z-25 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-[#E30613] text-gray-800 hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-md border border-gray-200/80 hover:border-[#E30613] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* =========================================================================
          BOTTOM THUMBNAIL FILMSTRIP (PAGES 1 TO 16 DIRECT JUMP)
          ========================================================================= */}
      <div className="bg-[#0B1120] p-2 sm:p-2.5 border-t border-gray-800">
        <div
          ref={thumbnailScrollRef}
          className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {activePages.map((pageData, index) => {
            const isActive = isPortrait
              ? index === currentPageIndex
              : index === currentPageIndex || index === currentPageIndex + 1;

            const isCoverThumb = index === 0;
            const isBackCoverThumb = index === totalPages - 1;

            return (
              <button
                key={index}
                type="button"
                data-active={isActive ? 'true' : 'false'}
                onClick={() => handleJumpToPage(index)}
                aria-label={`Aller à la page ${index + 1}`}
                className={`flex-shrink-0 flex flex-col items-center group transition-all duration-200 cursor-pointer ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-11 sm:w-14 aspect-[1/1.41] rounded-xs overflow-hidden bg-[#FAF9F5] border-2 transition-all relative shadow-sm flex flex-col justify-between ${
                    isActive
                      ? 'border-[#E30613] ring-2 ring-[#E30613]/50'
                      : 'border-gray-700 group-hover:border-gray-400'
                  }`}
                >
                  {/* Mini Header */}
                  <div className="w-full h-2.5 sm:h-3 bg-[#E30613] text-white flex items-center justify-between px-0.5 shrink-0">
                    <span className="text-[5px] font-black tracking-tighter">AZIZA</span>
                    <span className="text-[4px] font-bold text-amber-300">
                      {isCoverThumb ? 'PROMO' : isBackCoverThumb ? 'INFOS' : `P.${index + 1}`}
                    </span>
                  </div>

                  {/* Mini Content Area matching actual page artwork */}
                  <div className="flex-1 p-0.5 flex flex-col justify-between overflow-hidden">
                    {isCoverThumb ? (
                      /* Cover miniature: hero products preview */
                      <div className="h-full flex flex-col justify-between">
                        <div className="h-1 bg-amber-400/80 rounded-xs mb-0.5" />
                        <div className="grid grid-cols-2 gap-0.5 flex-1">
                          {pageData.products.slice(0, 2).map((p) => (
                            <div key={p.id} className="bg-white rounded-[1px] p-0.5 flex items-center justify-center overflow-hidden">
                              <img src={p.image} alt="" className="max-h-full max-w-full object-contain" />
                            </div>
                          ))}
                        </div>
                        <div className="bg-[#E30613] text-white text-[4px] font-black text-center rounded-[0.5px] mt-0.5 leading-tight">
                          -40%
                        </div>
                      </div>
                    ) : isBackCoverThumb ? (
                      /* Back cover miniature: store locator preview */
                      <div className="h-full flex flex-col items-center justify-center text-center p-0.5">
                        <span className="text-[8px] leading-none">🏪</span>
                        <div className="text-[4px] font-bold text-gray-700 mt-0.5">350+ Magasins</div>
                        <div className="text-[3.5px] text-[#E30613] font-black">71 123 456</div>
                      </div>
                    ) : (
                      /* Inside page miniature: 2x2 grid of actual products */
                      <div className="h-full grid grid-cols-2 grid-rows-2 gap-0.5 bg-white p-0.5 rounded-[1px]">
                        {pageData.products.slice(0, 4).map((p) => (
                          <div key={p.id} className="relative bg-gray-50/60 rounded-[0.5px] flex items-center justify-center overflow-hidden p-0.2">
                            <img src={p.image} alt="" className="max-h-full max-w-full object-contain" />
                            <span className="absolute bottom-0 right-0 bg-[#E30613] text-white text-[3.5px] font-black px-0.5 rounded-[0.5px] leading-tight">
                              {p.price.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mini Page Number Label */}
                  <div className="w-full bg-gray-100/90 text-center text-[5px] font-mono font-bold text-gray-600 border-t border-gray-200/60 py-0.2 shrink-0">
                    P. {index + 1}
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono mt-0.5 transition-colors ${
                    isActive ? 'text-[#E30613] font-black' : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                >
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
