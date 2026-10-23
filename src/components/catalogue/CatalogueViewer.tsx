import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2
} from 'lucide-react';
import type { Catalogue } from '../../types';
import { CATALOGUE_PAGES } from '../../data/flyerPages';
import { CatalogueFlyerPage } from './CatalogueFlyerPage';

interface CatalogueViewerProps {
  catalogue: Catalogue;
}

export const CatalogueViewer: React.FC<CatalogueViewerProps> = ({ catalogue }) => {
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0-indexed (page 1)
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalPages = catalogue.pageCount || CATALOGUE_PAGES.length;
  const step = isMobile ? 1 : 2;

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToNext = useCallback(() => {
    if (isMobile) {
      if (currentPageIndex < totalPages - 1) {
        setCurrentPageIndex((prev) => prev + 1);
      }
    } else {
      if (currentPageIndex + 2 < totalPages) {
        setCurrentPageIndex((prev) => prev + 2);
      }
    }
  }, [isMobile, currentPageIndex, totalPages]);

  const goToPrev = useCallback(() => {
    if (isMobile) {
      if (currentPageIndex > 0) {
        setCurrentPageIndex((prev) => prev - 1);
      }
    } else {
      if (currentPageIndex >= 2) {
        setCurrentPageIndex((prev) => prev - 2);
      }
    }
  }, [isMobile, currentPageIndex]);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
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
  }, [goToNext, goToPrev, exitFullscreen, isFullscreen, navigate]);

  // Touch Swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const jumpToPage = (index: number) => {
    if (isMobile) {
      setCurrentPageIndex(index);
    } else {
      // Ensure even alignment for dual view
      setCurrentPageIndex(index % 2 === 0 ? index : index - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${catalogue.title} - AZIZA Tunisie`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien du catalogue copié dans le presse-papier !');
    }
  };

  // Safe page accessor
  const getPageData = (pageIndex: number) => {
    const mod = pageIndex % CATALOGUE_PAGES.length;
    return CATALOGUE_PAGES[mod] || CATALOGUE_PAGES[0];
  };

  const leftPage = getPageData(currentPageIndex);
  const rightPage = !isMobile && currentPageIndex + 1 < totalPages ? getPageData(currentPageIndex + 1) : null;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#1E293B] text-white select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'rounded-3xl shadow-2xl overflow-hidden'
      }`}
    >
      {/* Top Reader Controls Bar */}
      <div className="bg-[#0F172A] px-3 sm:px-4 py-3 border-b border-gray-800 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/catalogues')}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour aux catalogues</span>
          </button>
          <div className="border-l border-gray-700 pl-2 sm:pl-3 truncate">
            <h2 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
              {catalogue.title}
            </h2>
            <p className="text-[10px] text-gray-400 hidden sm:block truncate">{catalogue.period}</p>
          </div>
        </div>

        {/* Center: Page indicator */}
        <div className="bg-gray-800/80 px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold text-gray-200 flex-shrink-0">
          {isMobile ? (
            <span>
              Page {currentPageIndex + 1} / {totalPages}
            </span>
          ) : (
            <span>
              Pages {currentPageIndex + 1}
              {rightPage ? ` - ${currentPageIndex + 2}` : ''} / {totalPages}
            </span>
          )}
        </div>

        {/* Right: Zoom & Fullscreen Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 hidden md:block"
            title="Zoom arrière"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 hidden md:block"
            title="Réinitialiser zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 hidden md:block"
            title="Zoom avant"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            title="Partager le catalogue"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Reading Stage with Touch Swipe Handling */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 bg-[#182030] p-2 sm:p-6 md:p-8 flex items-center justify-center overflow-auto min-h-[460px] sm:min-h-[520px]"
      >
        {/* Previous page arrow */}
        <button
          type="button"
          onClick={goToPrev}
          disabled={currentPageIndex === 0}
          aria-label="Pages précédentes"
          className="absolute left-1 sm:left-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#E30613] disabled:opacity-20 disabled:pointer-events-none text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Page Spread Container */}
        <div
          className="transition-transform duration-300 max-w-5xl w-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {isMobile ? (
            /* Single page view on mobile */
            <div className="w-full max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden">
              <CatalogueFlyerPage
                page={leftPage}
                pageNumber={currentPageIndex + 1}
                totalPages={totalPages}
              />
            </div>
          ) : (
            /* Dual page book spread on tablet/desktop matching design board */
            <div className="grid grid-cols-2 shadow-2xl rounded-xl overflow-hidden bg-white relative">
              {/* Left Page */}
              <div className="relative border-r border-gray-300">
                <CatalogueFlyerPage
                  page={leftPage}
                  pageNumber={currentPageIndex + 1}
                  totalPages={totalPages}
                />
              </div>

              {/* Center Crease / Spine Shadow */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 pointer-events-none bg-linear-to-r from-black/15 via-black/5 to-black/15 z-10" />

              {/* Right Page */}
              <div className="relative">
                {rightPage ? (
                  <CatalogueFlyerPage
                    page={rightPage}
                    pageNumber={currentPageIndex + 2}
                    totalPages={totalPages}
                  />
                ) : (
                  <div className="h-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
                    Fin du catalogue
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Next page arrow */}
        <button
          type="button"
          onClick={goToNext}
          disabled={currentPageIndex + step >= totalPages}
          aria-label="Pages suivantes"
          className="absolute right-1 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#E30613] disabled:opacity-20 disabled:pointer-events-none text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip matching design board */}
      <div className="bg-[#0F172A] p-2.5 sm:p-3 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700">
          {Array.from({ length: totalPages }).map((_, index) => {
            const isActive =
              isMobile
                ? index === currentPageIndex
                : index === currentPageIndex || index === currentPageIndex + 1;

            return (
              <button
                key={index}
                type="button"
                onClick={() => jumpToPage(index)}
                className={`flex-shrink-0 flex flex-col items-center group transition-all ${
                  isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-9 sm:w-12 aspect-3/4 rounded-sm overflow-hidden bg-gray-700 border-2 transition-colors relative shadow-xs ${
                    isActive ? 'border-[#E30613]' : 'border-gray-700 group-hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-full bg-[#E30613]/20 flex items-center justify-center text-[10px] font-black text-white">
                    {index + 1}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 mt-0.5">{index + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
