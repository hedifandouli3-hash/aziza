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
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRootRef = useRef<HTMLDivElement>(null);
  const pageFlipInstanceRef = useRef<PageFlip | null>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const currentPageIndexRef = useRef<number>(0);

  const totalPages = catalogue.pageCount || CATALOGUE_PAGES.length;
  const activePages = CATALOGUE_PAGES.slice(0, totalPages);

  // Keep currentPageIndexRef synced
  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  // Compute exact spread dimensions constrained by available stage viewport
  const computeDimensions = useCallback(() => {
    const stage = stageRef.current;
    const stageW = stage?.clientWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1200);
    const stageH = stage?.clientHeight ?? (typeof window !== 'undefined' ? window.innerHeight - 150 : 700);

    if (stageW <= 0 || stageH <= 0) {
      return {
        width: 840,
        height: 594,
        pageWidth: 420,
        isPortrait: false
      };
    }

    // Reserve clearance for navigation buttons and margins
    const horizontalMargin = stageW < 640 ? 16 : 80;
    const verticalMargin = stageW < 640 ? 12 : 24;

    const availW = Math.max(260, stageW - horizontalMargin);
    const availH = Math.max(260, stageH - verticalMargin);

    // Single-page portrait condition (mobile or very narrow window)
    const shouldUsePortrait = stageW < 768 || availW / availH < 1.05;

    if (shouldUsePortrait) {
      // Single page DIN A4 aspect ratio: ~0.7071 : 1 (width : height)
      const pageRatio = 0.7071;
      let w: number;
      let h: number;

      if (availH * pageRatio <= availW) {
        // Height-constrained
        h = Math.floor(availH);
        w = Math.floor(h * pageRatio);
      } else {
        // Width-constrained
        w = Math.floor(availW);
        h = Math.floor(w / pageRatio);
      }

      return {
        width: w,
        height: h,
        pageWidth: w,
        isPortrait: true
      };
    } else {
      // Two-page spread DIN A4 aspect ratio: ~1.4142 : 1 (spreadWidth : height)
      const spreadRatio = 1.4142;
      let spreadW: number;
      let spreadH: number;

      if (availH * spreadRatio <= availW) {
        // Height-constrained: height binds first
        spreadH = Math.floor(availH);
        spreadW = Math.floor(spreadH * spreadRatio);
      } else {
        // Width-constrained: width binds first
        spreadW = Math.floor(availW);
        spreadH = Math.floor(spreadW / spreadRatio);
      }

      // Ensure even width so each page has an integer pixel width
      if (spreadW % 2 !== 0) spreadW -= 1;
      const pageW = Math.floor(spreadW / 2);

      return {
        width: spreadW,
        height: spreadH,
        pageWidth: pageW,
        isPortrait: false
      };
    }
  }, []);

  const [spreadSize, setSpreadSize] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const isMobile = w < 768;
    if (isMobile) {
      const pageRatio = 0.7071;
      const availH = Math.max(300, h - 160);
      const availW = Math.max(260, w - 24);
      const height = Math.floor(Math.min(availH, availW / pageRatio));
      const width = Math.floor(height * pageRatio);
      return { width, height, pageWidth: width, isPortrait: true };
    } else {
      const spreadRatio = 1.4142;
      const availH = Math.max(350, h - 160);
      const availW = Math.max(500, w - 90);
      let spreadW: number;
      let spreadH: number;
      if (availH * spreadRatio <= availW) {
        spreadH = Math.floor(availH);
        spreadW = Math.floor(spreadH * spreadRatio);
      } else {
        spreadW = Math.floor(availW);
        spreadH = Math.floor(spreadW / spreadRatio);
      }
      if (spreadW % 2 !== 0) spreadW -= 1;
      return { width: spreadW, height: spreadH, pageWidth: Math.floor(spreadW / 2), isPortrait: false };
    }
  });
  const [renderKey, setRenderKey] = useState(0);

  // ResizeObserver on the reading stage to recalculate dimensions on screen change
  useEffect(() => {
    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const next = computeDimensions();
        setSpreadSize((prev) => {
          if (
            Math.abs(prev.width - next.width) > 6 ||
            Math.abs(prev.height - next.height) > 6 ||
            prev.isPortrait !== next.isPortrait
          ) {
            setRenderKey((k) => k + 1);
            return next;
          }
          return prev;
        });
      }, 100);
    };

    const stage = stageRef.current;
    let observer: ResizeObserver | null = null;
    if (stage && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      observer.observe(stage);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Also listen to window resize for orientation change
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [computeDimensions]);

  // Initialize PageFlip instance
  useEffect(() => {
    if (!bookRootRef.current) return;

    let isMounted = true;
    setIsReady(false);

    const timer = setTimeout(() => {
      if (!bookRootRef.current || !isMounted) return;

      try {
        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch {
            // ignore
          }
          pageFlipInstanceRef.current = null;
        }

        const pf = new PageFlip(bookRootRef.current, {
          width: spreadSize.pageWidth,
          height: spreadSize.height,
          size: 'fixed',
          autoSize: false,
          minWidth: 0,
          minHeight: 0,
          maxWidth: 3000,
          maxHeight: 3000,
          startPage: currentPageIndexRef.current,
          showCover: false, // Start with page 1 & 2 open side by side on desktop
          mobileScrollSupport: false,
          usePortrait: true, // Automatically single-page portrait on mobile
          flippingTime: 700,
          useMouseEvents: true,
          clickEventForward: true,
          showPageCorners: true,
          swipeDistance: 25,
          maxShadowOpacity: 0.6
        });

        const pages = bookRootRef.current.querySelectorAll('.flyer-page-item');
        if (pages.length > 0) {
          pf.loadFromHTML(pages);
        }

        pf.on('flip', (e: { data: number }) => {
          if (isMounted) {
            setCurrentPageIndex(e.data);
            currentPageIndexRef.current = e.data;
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
            if (currentPageIndexRef.current > 0) {
              try {
                pf.turnToPage(currentPageIndexRef.current);
              } catch {
                // ignore
              }
            }
          }
        });

        pageFlipInstanceRef.current = pf;

        // Fallback readiness trigger
        setTimeout(() => {
          if (isMounted) {
            setIsReady(true);
          }
        }, 120);
      } catch (err) {
        console.error('PageFlip initialization error:', err);
        if (isMounted) {
          setIsReady(true);
        }
      }
    }, 50);

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
  }, [catalogue.id, renderKey, spreadSize.pageWidth, spreadSize.height]);

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
      className={`h-full w-full flex flex-col bg-[#0F172A] text-white select-none transition-all duration-300 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'rounded-2xl shadow-xl'
      }`}
    >
      {/* =========================================================================
          REFINED TOP TOOLBAR (H-11/H-12 SHRINK-0: SLEEK CONTROLS & RED CHEVRONS)
          ========================================================================= */}
      <div className="h-11 sm:h-12 shrink-0 bg-[#0B1120] px-3 sm:px-5 border-b border-gray-800 flex items-center justify-between gap-2 sm:gap-4 z-30">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/catalogues')}
            aria-label="Retourner aux catalogues"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white px-2.5 py-1 rounded-lg bg-gray-800/90 hover:bg-[#E30613] transition-all flex-shrink-0 cursor-pointer shadow-xs"
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
          MAIN READING STAGE (FITS EXACT AVAILABLE VIEWPORT HEIGHT)
          ========================================================================= */}
      <div
        ref={stageRef}
        className="relative flex-1 min-h-0 w-full bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] p-1 sm:p-2 md:p-3 flex items-center justify-center overflow-hidden"
      >
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
          className="flex items-center justify-center select-none"
        >
          <div
            ref={bookRootRef}
            key={renderKey}
            style={{
              width: `${spreadSize.width}px`,
              height: `${spreadSize.height}px`,
              maxWidth: `${spreadSize.width}px`,
              maxHeight: `${spreadSize.height}px`
            }}
            className="catalogue-flipbook-root mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] rounded-xl overflow-hidden bg-white shrink-0"
          >
            {activePages.map((page, index) => (
              <div
                key={page.pageNumber}
                className="flyer-page-item bg-[#FAF9F5] overflow-hidden"
                data-density={index === 0 || index === totalPages - 1 ? 'hard' : 'soft'}
                style={{
                  width: `${spreadSize.pageWidth}px`,
                  height: `${spreadSize.height}px`
                }}
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
          BOTTOM THUMBNAIL FILMSTRIP (H-14/H-16 SHRINK-0 COMPACT SPREAD SELECTOR)
          ========================================================================= */}
      <div className="h-14 sm:h-16 shrink-0 bg-[#0B1120] px-2 py-1 border-t border-gray-800 flex items-center">
        <div
          ref={thumbnailScrollRef}
          className="max-w-5xl mx-auto w-full flex items-center gap-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent py-0.5"
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
                  className={`w-9 sm:w-11 aspect-[1/1.41] rounded-xs overflow-hidden bg-[#FAF9F5] border-2 transition-all relative shadow-2xs flex flex-col justify-between ${
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
                      <div className="h-full flex flex-col justify-between">
                        <div className="h-0.5 bg-amber-400/80 rounded-xs mb-0.5" />
                        <div className="grid grid-cols-2 gap-0.5 flex-1">
                          {pageData.products.slice(0, 2).map((p) => (
                            <div key={p.id} className="bg-white rounded-[1px] p-0.2 flex items-center justify-center overflow-hidden">
                              <img src={p.image} alt="" className="max-h-full max-w-full object-contain" />
                            </div>
                          ))}
                        </div>
                        <div className="bg-[#E30613] text-white text-[3.5px] font-black text-center rounded-[0.5px] mt-0.5 leading-tight">
                          -40%
                        </div>
                      </div>
                    ) : isBackCoverThumb ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-0.5">
                        <span className="text-[7px] leading-none">🏪</span>
                        <div className="text-[3.5px] font-bold text-gray-700 mt-0.5">350+ Magasins</div>
                        <div className="text-[3px] text-[#E30613] font-black">71 123 456</div>
                      </div>
                    ) : (
                      <div className="h-full grid grid-cols-2 grid-rows-2 gap-0.5 bg-white p-0.5 rounded-[1px]">
                        {pageData.products.slice(0, 4).map((p) => (
                          <div key={p.id} className="relative bg-gray-50/60 rounded-[0.5px] flex items-center justify-center overflow-hidden p-0.2">
                            <img src={p.image} alt="" className="max-h-full max-w-full object-contain" />
                            <span className="absolute bottom-0 right-0 bg-[#E30613] text-white text-[3px] font-black px-0.5 rounded-[0.5px] leading-tight">
                              {p.price.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mini Page Number Label */}
                  <div className="w-full bg-gray-100/90 text-center text-[4.5px] font-mono font-bold text-gray-600 border-t border-gray-200/60 py-0.2 shrink-0">
                    P. {index + 1}
                  </div>
                </div>

                <span
                  className={`text-[8px] font-mono mt-0.5 transition-colors leading-none ${
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
