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
  Check
} from 'lucide-react';
import type { Catalogue } from '../../types';
import { CATALOGUE_PAGES } from '../../data/flyerPages';
import { CatalogueFlyerPage } from './CatalogueFlyerPage';

interface CatalogueViewerProps {
  catalogue: Catalogue;
}

interface FlipState {
  direction: 'next' | 'prev';
  active: boolean;
}

export const CatalogueViewer: React.FC<CatalogueViewerProps> = ({ catalogue }) => {
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0-indexed (Page 1 = index 0)
  const [flipState, setFlipState] = useState<FlipState | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const totalPages = catalogue.pageCount || CATALOGUE_PAGES.length;
  const step = isMobile ? 1 : 2;

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Safe page accessor from catalogue pages
  const getPageData = useCallback((pageIndex: number) => {
    const mod = pageIndex % CATALOGUE_PAGES.length;
    return CATALOGUE_PAGES[mod] || CATALOGUE_PAGES[0];
  }, []);

  // Complete the flip animation and update state
  const finishFlip = useCallback(
    (direction: 'next' | 'prev') => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }

      const advanceStep = isMobile ? 1 : 2;
      if (direction === 'next') {
        setCurrentPageIndex((prev) => Math.min(prev + advanceStep, totalPages - 1));
      } else {
        setCurrentPageIndex((prev) => Math.max(0, prev - advanceStep));
      }

      setFlipState(null);
      isAnimatingRef.current = false;
    },
    [isMobile, totalPages]
  );

  // Trigger 3D paper flip
  const triggerFlip = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimatingRef.current) return;

      const advanceStep = isMobile ? 1 : 2;
      if (direction === 'next') {
        if (currentPageIndex + advanceStep >= totalPages) return;
      } else {
        if (currentPageIndex === 0) return;
      }

      isAnimatingRef.current = true;

      // Stage 1: Render flipping leaf at rest (0deg, no transition)
      setFlipState({ direction, active: false });

      // Stage 2: In next animation frames, apply transition and target angle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlipState({ direction, active: true });
        });
      });

      // Stage 3: Fallback timer in case transitionend does not fire
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = window.setTimeout(() => {
        finishFlip(direction);
      }, 750);
    },
    [currentPageIndex, isMobile, totalPages, finishFlip]
  );

  const goToNext = useCallback(() => {
    triggerFlip('next');
  }, [triggerFlip]);

  const goToPrev = useCallback(() => {
    triggerFlip('prev');
  }, [triggerFlip]);

  const goToFirst = useCallback(() => {
    if (isAnimatingRef.current || currentPageIndex === 0) return;
    if (currentPageIndex === (isMobile ? 1 : 2)) {
      triggerFlip('prev');
    } else {
      setCurrentPageIndex(0);
    }
  }, [currentPageIndex, isMobile, triggerFlip]);

  const goToLast = useCallback(() => {
    if (isAnimatingRef.current) return;
    const advanceStep = isMobile ? 1 : 2;
    const lastIndex = Math.floor((totalPages - 1) / advanceStep) * advanceStep;
    if (currentPageIndex >= lastIndex) return;

    if (currentPageIndex === lastIndex - advanceStep) {
      triggerFlip('next');
    } else {
      setCurrentPageIndex(lastIndex);
    }
  }, [currentPageIndex, isMobile, totalPages, triggerFlip]);

  const jumpToPage = useCallback(
    (targetIndex: number) => {
      if (isAnimatingRef.current) return;
      const advanceStep = isMobile ? 1 : 2;
      const alignedIndex = isMobile ? targetIndex : Math.floor(targetIndex / 2) * 2;
      if (alignedIndex === currentPageIndex) return;

      if (alignedIndex === currentPageIndex + advanceStep) {
        triggerFlip('next');
      } else if (alignedIndex === currentPageIndex - advanceStep) {
        triggerFlip('prev');
      } else {
        setCurrentPageIndex(alignedIndex);
      }
    },
    [currentPageIndex, isMobile, triggerFlip]
  );

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
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Home') {
        goToFirst();
      } else if (e.key === 'End') {
        goToLast();
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
  }, [goToNext, goToPrev, goToFirst, goToLast, exitFullscreen, isFullscreen, navigate]);

  // Touch swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Ensure horizontal swipe dominant
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    if (!thumbnailScrollRef.current) return;
    const activeEl = thumbnailScrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentPageIndex]);

  // Handle transition end for realistic CSS 3D transform
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === 'transform' && flipState) {
      finishFlip(flipState.direction);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${catalogue.title} - AZIZA Tunisie`,
          text: `Découvrez les offres de la semaine sur le ${catalogue.title} AZIZA Tunisie`,
          url: window.location.href
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopiedToast(true);
          setTimeout(() => setCopiedToast(false), 2200);
        })
        .catch(() => {});
    }
  };

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2400);
  };

  // Direct page click handlers (ignores clicks on child links or buttons)
  const handleRightPageClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    goToNext();
  };

  const handleLeftPageClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    goToPrev();
  };

  // Base pages calculation
  const leftPageData = getPageData(currentPageIndex);
  const rightPageData =
    !isMobile && currentPageIndex + 1 < totalPages ? getPageData(currentPageIndex + 1) : null;

  // Pages involved during flip animation
  const isFlipping = Boolean(flipState);
  const isFlippingNext = flipState?.direction === 'next';
  const isFlippingPrev = flipState?.direction === 'prev';

  // For NEXT flip:
  // - underLeft: currentPageIndex (Page 1)
  // - underRight: currentPageIndex + 3 (Page 4)
  // - leaf front: currentPageIndex + 1 (Page 2)
  // - leaf back: currentPageIndex + 2 (Page 3)
  const underLeftDataNext = leftPageData;
  const underRightDataNext =
    currentPageIndex + 3 < totalPages ? getPageData(currentPageIndex + 3) : null;
  const leafFrontDataNext = rightPageData || leftPageData;
  const leafBackDataNext =
    currentPageIndex + 2 < totalPages ? getPageData(currentPageIndex + 2) : getPageData(currentPageIndex);

  // For PREV flip:
  // - underLeft: currentPageIndex - 2 (Page 1)
  // - underRight: currentPageIndex + 1 (Page 4)
  // - leaf front: currentPageIndex (Page 3)
  // - leaf back: currentPageIndex - 1 (Page 2)
  const underLeftDataPrev =
    currentPageIndex >= 2 ? getPageData(currentPageIndex - 2) : getPageData(0);
  const leafFrontDataPrev = leftPageData;
  const leafBackDataPrev =
    currentPageIndex >= 1 ? getPageData(currentPageIndex - 1) : getPageData(0);

  const isAtFirst = currentPageIndex === 0;
  const isAtLast = currentPageIndex + step >= totalPages;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#0F172A] text-white select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'rounded-3xl shadow-2xl overflow-hidden'
      }`}
    >
      {/* =========================================================================
          TOP NAVIGATION BAR (AZIZA RED CHEVRONS & REALISTIC TOOLBAR)
          ========================================================================= */}
      <div className="bg-[#0B1120] px-3 sm:px-6 py-2.5 sm:py-3 border-b border-gray-800 flex items-center justify-between gap-2 sm:gap-4 z-30">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/catalogues')}
            aria-label="Retourner aux catalogues"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-800/90 hover:bg-[#E30613] transition-all flex-shrink-0 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
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

        {/* Center: AZIZA RED NAVIGATION CONTROLS (|<<  <  PAGE  >  >>|) */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-900/90 px-1.5 py-1 rounded-2xl border border-gray-800 shadow-inner flex-shrink-0">
          {/* First Page (|<<) */}
          <button
            type="button"
            onClick={goToFirst}
            disabled={isAtFirst || isFlipping}
            title="Première page (Début)"
            aria-label="Première page"
            className="p-1 sm:p-1.5 rounded-lg bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Previous Page (<) */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={isAtFirst || isFlipping}
            title="Page précédente (Flèche gauche)"
            aria-label="Page précédente"
            className="p-1 sm:p-1.5 rounded-lg bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Page Counter Badge */}
          <div className="px-2.5 sm:px-3.5 py-0.5 text-[11px] sm:text-xs font-mono font-bold text-gray-100 whitespace-nowrap min-w-[70px] sm:min-w-[100px] text-center">
            {isMobile ? (
              <span>
                Page <span className="text-[#E30613] font-black">{currentPageIndex + 1}</span> / {totalPages}
              </span>
            ) : (
              <span>
                Pages{' '}
                <span className="text-[#E30613] font-black">
                  {currentPageIndex + 1}
                  {rightPageData ? ` - ${currentPageIndex + 2}` : ''}
                </span>{' '}
                / {totalPages}
              </span>
            )}
          </div>

          {/* Next Page (>) */}
          <button
            type="button"
            onClick={goToNext}
            disabled={isAtLast || isFlipping}
            title="Page suivante (Flèche droite)"
            aria-label="Page suivante"
            className="p-1 sm:p-1.5 rounded-lg bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Last Page (>>|) */}
          <button
            type="button"
            onClick={goToLast}
            disabled={isAtLast || isFlipping}
            title="Dernière page (Fin)"
            aria-label="Dernière page"
            className="p-1 sm:p-1.5 rounded-lg bg-[#E30613] hover:bg-[#c20510] active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-all shadow-xs disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Zoom, Download, Share, Fullscreen Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.1).toFixed(1))))}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Zoom arrière"
            aria-label="Zoom arrière"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Réinitialiser zoom"
            aria-label="Réinitialiser zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.1).toFixed(1))))}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 hidden sm:block transition-colors"
            title="Zoom avant"
            aria-label="Zoom avant"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Download PDF button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 text-gray-300 hover:text-[#E30613] rounded-lg hover:bg-gray-800 transition-colors"
              title="Télécharger le catalogue PDF"
              aria-label="Télécharger le catalogue PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            {downloadToast && (
              <span className="absolute -bottom-8 right-0 bg-[#E30613] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-40 animate-in fade-in flex items-center gap-1">
                <Check className="w-3 h-3" /> Téléchargement lancé
              </span>
            )}
          </div>

          {/* Share button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-gray-300 hover:text-[#E30613] rounded-lg hover:bg-gray-800 transition-colors"
              title="Partager le catalogue"
              aria-label="Partager le catalogue"
            >
              <Share2 className="w-4 h-4" />
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
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
            aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          MAIN READING STAGE (CLEAN LIGHT NEUTRAL STAGE WITH 3D PERSPECTIVE)
          ========================================================================= */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] p-2 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden min-h-[480px] sm:min-h-[580px] md:min-h-[640px]"
      >
        {/* Floating Left Arrow on Reading Stage */}
        <button
          type="button"
          onClick={goToPrev}
          disabled={isAtFirst || isFlipping}
          aria-label="Pages précédentes"
          className="absolute left-2 sm:left-4 md:left-6 z-25 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#E30613] text-gray-800 hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-xl border border-gray-200/80 hover:border-[#E30613] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* 3D BOOK SPREAD CONTAINER */}
        <div
          className="transition-transform duration-300 max-w-5xl w-full select-none"
          style={{
            transform: `scale(${zoomLevel})`,
            perspective: '2500px',
            WebkitPerspective: '2500px'
          }}
        >
          {isMobile ? (
            /* =================================================================
               MOBILE SINGLE-PAGE 3D FLIP VIEW
               ================================================================= */
            <div
              className="relative w-full max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden bg-white"
              style={{
                perspective: '1800px',
                WebkitPerspective: '1800px'
              }}
            >
              {/* Underlying Base Page */}
              <div className="w-full">
                <CatalogueFlyerPage
                  page={
                    flipState
                      ? isFlippingNext
                        ? getPageData(currentPageIndex + 1)
                        : getPageData(Math.max(0, currentPageIndex - 1))
                      : leftPageData
                  }
                  pageNumber={
                    flipState
                      ? isFlippingNext
                        ? currentPageIndex + 2
                        : currentPageIndex
                      : currentPageIndex + 1
                  }
                  totalPages={totalPages}
                />
              </div>

              {/* Mobile Flipping Leaf */}
              {flipState && (
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className="absolute inset-0 z-30 pointer-events-none"
                  style={{
                    transformOrigin: isFlippingNext ? 'left center' : 'right center',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: isFlippingNext
                      ? flipState.active
                        ? 'rotateY(-180deg)'
                        : 'rotateY(0deg)'
                      : flipState.active
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                    transition: flipState.active
                      ? 'transform 650ms cubic-bezier(0.25, 0.1, 0.25, 1)'
                      : 'none',
                    willChange: 'transform'
                  }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={leftPageData}
                      pageNumber={currentPageIndex + 1}
                      totalPages={totalPages}
                    />
                    <div
                      className="absolute inset-0 bg-black/25 transition-opacity duration-300"
                      style={{ opacity: flipState.active ? 0.6 : 0 }}
                    />
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={
                        isFlippingNext
                          ? getPageData(currentPageIndex + 1)
                          : getPageData(Math.max(0, currentPageIndex - 1))
                      }
                      pageNumber={isFlippingNext ? currentPageIndex + 2 : currentPageIndex}
                      totalPages={totalPages}
                    />
                    <div
                      className="absolute inset-0 bg-black/25 transition-opacity duration-500"
                      style={{ opacity: flipState.active ? 0 : 0.6 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* =================================================================
               DESKTOP TWO-PAGE SPREAD WITH AUTHENTIC 3D PAPER FLIP
               ================================================================= */
            <div
              className="relative grid grid-cols-2 bg-white rounded-2xl overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06),-4px_2px_0_0_#f1f5f9,4px_2px_0_0_#f1f5f9] select-none"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d'
              }}
            >
              {/* -------------------------------------------------------------
                  LEFT PAGE (BASE VIEW / UNDERNEATH WHEN FLIPPING PREV)
                  ------------------------------------------------------------- */}
              <div
                onClick={handleLeftPageClick}
                className="relative border-r border-gray-200/80 cursor-pointer overflow-hidden rounded-l-2xl group/leftpage"
                title="Cliquer pour feuilleter vers la gauche"
              >
                <CatalogueFlyerPage
                  page={isFlippingPrev ? underLeftDataPrev : underLeftDataNext}
                  pageNumber={
                    isFlippingPrev
                      ? Math.max(1, currentPageIndex - 1)
                      : currentPageIndex + 1
                  }
                  totalPages={totalPages}
                />

                {/* Left Page Corner Curl Hint */}
                {!isAtFirst && !flipState && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Tourner à la page précédente"
                    className="group/curl absolute bottom-0 left-0 w-14 h-14 z-20 flex items-end justify-start p-1 overflow-hidden transition-all hover:w-18 hover:h-18 cursor-pointer"
                    title="Cliquer pour tourner la page précédente"
                  >
                    <div className="w-12 h-12 bg-gradient-to-tr from-gray-200 via-white to-gray-50 group-hover/curl:from-red-100 group-hover/curl:via-white shadow-[3px_-3px_7px_rgba(0,0,0,0.18)] -rotate-45 -translate-x-6 translate-y-6 group-hover/curl:-translate-x-4 group-hover/curl:translate-y-4 transition-transform border border-gray-300/80" />
                    <span className="absolute bottom-1 left-1 text-[9px] font-black text-gray-500 group-hover/curl:text-[#E30613] tracking-tighter">
                      &lt;
                    </span>
                  </button>
                )}

                {/* Soft gradient cast when left leaf lifts during flip prev */}
                {isFlippingPrev && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-15"
                    style={{
                      background:
                        'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, transparent 70%)',
                      opacity: flipState?.active ? 0 : 0.8
                    }}
                  />
                )}
              </div>

              {/* -------------------------------------------------------------
                  CENTRAL SPIDER SPINE & CREASE SHADOW
                  ------------------------------------------------------------- */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20 flex">
                {/* Left half gutter gradient */}
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-black/10 to-black/25" />
                {/* 1px Center Crease Line with paper highlight */}
                <div className="w-[1px] h-full bg-black/35 shadow-[0_0_2px_rgba(255,255,255,0.4)]" />
                {/* Right half gutter gradient */}
                <div className="w-1/2 h-full bg-gradient-to-l from-transparent via-black/10 to-black/25" />
              </div>

              {/* -------------------------------------------------------------
                  RIGHT PAGE (BASE VIEW / UNDERNEATH WHEN FLIPPING NEXT)
                  ------------------------------------------------------------- */}
              <div
                onClick={handleRightPageClick}
                className="relative cursor-pointer overflow-hidden rounded-r-2xl group/rightpage"
                title="Cliquer pour feuilleter vers la droite"
              >
                {rightPageData || isFlippingNext ? (
                  <CatalogueFlyerPage
                    page={isFlippingNext && underRightDataNext ? underRightDataNext : (rightPageData || leftPageData)}
                    pageNumber={
                      isFlippingNext
                        ? currentPageIndex + 4
                        : currentPageIndex + 2
                    }
                    totalPages={totalPages}
                  />
                ) : (
                  <div className="h-full min-h-[500px] sm:min-h-[580px] bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-[#E30613] font-black text-xl mb-2">
                      AZIZA
                    </div>
                    <p className="text-xs font-bold text-gray-600">Fin du catalogue</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Retrouvez tous nos produits et offres en magasin.
                    </p>
                  </div>
                )}

                {/* Right Page Corner Curl Hint */}
                {!isAtLast && !flipState && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Tourner à la page suivante"
                    className="group/curl absolute bottom-0 right-0 w-14 h-14 z-20 flex items-end justify-end p-1 overflow-hidden transition-all hover:w-18 hover:h-18 cursor-pointer"
                    title="Cliquer pour tourner la page suivante"
                  >
                    <div className="w-12 h-12 bg-gradient-to-tl from-gray-200 via-white to-gray-50 group-hover/curl:from-red-100 group-hover/curl:via-white shadow-[-3px_-3px_7px_rgba(0,0,0,0.18)] rotate-45 translate-x-6 translate-y-6 group-hover/curl:translate-x-4 group-hover/curl:translate-y-4 transition-transform border border-gray-300/80" />
                    <span className="absolute bottom-1 right-1 text-[9px] font-black text-gray-500 group-hover/curl:text-[#E30613] tracking-tighter">
                      &gt;
                    </span>
                  </button>
                )}

                {/* Soft gradient cast when right leaf lifts during flip next */}
                {isFlippingNext && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-15"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 30%, transparent 70%)',
                      opacity: flipState?.active ? 0 : 0.8
                    }}
                  />
                )}
              </div>

              {/* -------------------------------------------------------------
                  FLIPPING LEAF FOR NEXT (ROTATES RIGHT TO LEFT: 0deg -> -180deg)
                  ------------------------------------------------------------- */}
              {isFlippingNext && (
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className="absolute inset-y-0 left-1/2 w-1/2 pointer-events-none z-30"
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: flipState.active ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    transition: flipState.active
                      ? 'transform 650ms cubic-bezier(0.25, 0.1, 0.25, 1)'
                      : 'none',
                    willChange: 'transform'
                  }}
                >
                  {/* Leaf Front Face: Shows Current Right Page */}
                  <div
                    className="absolute inset-0 bg-white overflow-hidden rounded-r-2xl shadow-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={leafFrontDataNext}
                      pageNumber={currentPageIndex + 2}
                      totalPages={totalPages}
                    />
                    {/* Moving paper curl lighting & shadow on front face */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(255,255,255,0.2) 25%, rgba(0,0,0,0.06) 65%, rgba(0,0,0,0.35) 100%)',
                        opacity: flipState.active ? 0.7 : 0
                      }}
                    />
                  </div>

                  {/* Leaf Back Face: Shows Upcoming Left Page */}
                  <div
                    className="absolute inset-0 bg-white overflow-hidden rounded-l-2xl shadow-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={leafBackDataNext}
                      pageNumber={currentPageIndex + 3}
                      totalPages={totalPages}
                    />
                    {/* Moving paper curl lighting & shadow on back face */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.2) 20%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)',
                        opacity: flipState.active ? 0 : 0.7
                      }}
                    />
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  FLIPPING LEAF FOR PREV (ROTATES LEFT TO RIGHT: 0deg -> +180deg)
                  ------------------------------------------------------------- */}
              {isFlippingPrev && (
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-30"
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: flipState.active ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: flipState.active
                      ? 'transform 650ms cubic-bezier(0.25, 0.1, 0.25, 1)'
                      : 'none',
                    willChange: 'transform'
                  }}
                >
                  {/* Leaf Front Face: Shows Current Left Page */}
                  <div
                    className="absolute inset-0 bg-white overflow-hidden rounded-l-2xl shadow-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={leafFrontDataPrev}
                      pageNumber={currentPageIndex + 1}
                      totalPages={totalPages}
                    />
                    {/* Moving paper curl lighting & shadow on front face */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(255,255,255,0.2) 25%, rgba(0,0,0,0.06) 65%, rgba(0,0,0,0.35) 100%)',
                        opacity: flipState.active ? 0.7 : 0
                      }}
                    />
                  </div>

                  {/* Leaf Back Face: Shows Upcoming Right Page */}
                  <div
                    className="absolute inset-0 bg-white overflow-hidden rounded-r-2xl shadow-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(1px)'
                    }}
                  >
                    <CatalogueFlyerPage
                      page={leafBackDataPrev}
                      pageNumber={currentPageIndex}
                      totalPages={totalPages}
                    />
                    {/* Moving paper curl lighting & shadow on back face */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.2) 20%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)',
                        opacity: flipState.active ? 0 : 0.7
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Right Arrow on Reading Stage */}
        <button
          type="button"
          onClick={goToNext}
          disabled={isAtLast || isFlipping}
          aria-label="Pages suivantes"
          className="absolute right-2 sm:right-4 md:right-6 z-25 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#E30613] text-gray-800 hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-xl border border-gray-200/80 hover:border-[#E30613] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* =========================================================================
          BOTTOM THUMBNAIL FILMSTRIP (PAGES 1 TO 16 DIRECT JUMP)
          ========================================================================= */}
      <div className="bg-[#0B1120] p-2 sm:p-3 border-t border-gray-800">
        <div
          ref={thumbnailScrollRef}
          className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {Array.from({ length: totalPages }).map((_, index) => {
            const isActive = isMobile
              ? index === currentPageIndex
              : index === currentPageIndex || index === currentPageIndex + 1;

            return (
              <button
                key={index}
                type="button"
                data-active={isActive ? 'true' : 'false'}
                onClick={() => jumpToPage(index)}
                aria-label={`Aller à la page ${index + 1}`}
                className={`flex-shrink-0 flex flex-col items-center group transition-all duration-200 cursor-pointer ${
                  isActive ? 'scale-105' : 'opacity-65 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 sm:w-13 aspect-[3/4] rounded-sm overflow-hidden bg-white border-2 transition-all relative shadow-sm ${
                    isActive
                      ? 'border-[#E30613] ring-2 ring-[#E30613]/50'
                      : 'border-gray-700 group-hover:border-gray-400'
                  }`}
                >
                  {/* Miniature representation of flyer header */}
                  <div className="w-full h-2.5 bg-[#E30613] flex items-center justify-center">
                    <span className="text-[6px] font-black text-white scale-75">AZIZA</span>
                  </div>
                  {/* Miniature representation of product cards */}
                  <div className="p-0.5 grid grid-cols-2 gap-0.5 h-full bg-gray-50">
                    <div className="bg-red-50 rounded-[1px] flex items-center justify-center text-[7px] font-bold text-[#E30613]">
                      %
                    </div>
                    <div className="bg-amber-50 rounded-[1px] flex items-center justify-center text-[6px] text-gray-500">
                      DT
                    </div>
                  </div>
                  {/* Number Overlay */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent flex items-center justify-center text-[10px] font-black text-gray-900 drop-shadow-xs">
                    {index + 1}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono mt-0.5 transition-colors ${
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
