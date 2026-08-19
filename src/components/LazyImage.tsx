import React, { useState, useEffect, useRef } from 'react';

/**
 * Transforms nutrition image URLs into optimal WebP format.
 * Supports Unsplash CDN (fm=webp), while preserving static CDN/R2 URLs as is.
 */
export const ensureWebPUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return url;
  
  // Unsplash URLs support parameter transformation
  if (url.includes('images.unsplash.com')) {
    if (url.includes('fm=webp') || url.includes('format=webp')) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}fm=webp`;
  }

  // Return static storage URLs (R2, S3, Firebase, local, etc.) directly
  return url;
};

const DEFAULT_CATEGORY_PHOTOS: Record<string, string> = {
  egg: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80&fm=webp',
  poultry: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80&fm=webp',
  meat: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80&fm=webp',
  fish: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80&fm=webp',
  dairy: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80&fm=webp',
  carb: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80&fm=webp',
  grain: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80&fm=webp',
  vegetable: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80&fm=webp',
  fruit: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80&fm=webp',
  breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80&fm=webp',
  lunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80&fm=webp',
  dinner: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80&fm=webp',
  snack: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80&fm=webp',
  pre_workout: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80&fm=webp',
  post_workout: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80&fm=webp',
  before_sleep: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80&fm=webp',
  default: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80&fm=webp',
};

export const getAutoFoodPhoto = (altText: string = '', categoryOrType?: string, providedFallback?: string): string => {
  if (providedFallback && providedFallback.trim() !== '') return ensureWebPUrl(providedFallback);
  const t = (altText + ' ' + (categoryOrType || '')).toLowerCase();
  if (t.includes('بيض') || t.includes('egg')) return DEFAULT_CATEGORY_PHOTOS.egg;
  if (t.includes('دجاج') || t.includes('حبش') || t.includes('طيور') || t.includes('poultry') || t.includes('chicken')) return DEFAULT_CATEGORY_PHOTOS.poultry;
  if (t.includes('لحم') || t.includes('ستيك') || t.includes('beef') || t.includes('meat')) return DEFAULT_CATEGORY_PHOTOS.meat;
  if (t.includes('سمك') || t.includes('سلمون') || t.includes('تونة') || t.includes('fish') || t.includes('tuna') || t.includes('salmon')) return DEFAULT_CATEGORY_PHOTOS.fish;
  if (t.includes('زبادي') || t.includes('لبن') || t.includes('جبن') || t.includes('قريش') || t.includes('dairy') || t.includes('yogurt') || t.includes('cheese')) return DEFAULT_CATEGORY_PHOTOS.dairy;
  if (t.includes('تفاح') || t.includes('موز') || t.includes('توت') || t.includes('فراولة') || t.includes('فاكهة') || t.includes('fruit') || t.includes('apple') || t.includes('banana')) return DEFAULT_CATEGORY_PHOTOS.fruit;
  if (t.includes('بروكلي') || t.includes('خضار') || t.includes('سلطة') || t.includes('خيار') || t.includes('veg') || t.includes('salad')) return DEFAULT_CATEGORY_PHOTOS.vegetable;
  if (t.includes('أرز') || t.includes('شوفان') || t.includes('توست') || t.includes('خبز') || t.includes('بطاطا') || t.includes('carb') || t.includes('rice') || t.includes('oat')) return DEFAULT_CATEGORY_PHOTOS.carb;
  if (t.includes('فطور') || t.includes('إفطار') || t.includes('breakfast')) return DEFAULT_CATEGORY_PHOTOS.breakfast;
  if (t.includes('غداء') || t.includes('lunch')) return DEFAULT_CATEGORY_PHOTOS.lunch;
  if (t.includes('عشاء') || t.includes('dinner')) return DEFAULT_CATEGORY_PHOTOS.dinner;
  if (t.includes('سناك') || t.includes('مكسرات') || t.includes('لوز') || t.includes('snack')) return DEFAULT_CATEGORY_PHOTOS.snack;
  if (categoryOrType && DEFAULT_CATEGORY_PHOTOS[categoryOrType]) return DEFAULT_CATEGORY_PHOTOS[categoryOrType];
  return DEFAULT_CATEGORY_PHOTOS.default;
};

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  fallbackEmoji?: string;
  categoryOrType?: string;
  alt: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  fallbackSrc,
  fallbackEmoji = '🥗',
  categoryOrType,
  alt,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const autoFallback = getAutoFoodPhoto(alt, categoryOrType, fallbackSrc);
  const rawSrc = src && typeof src === 'string' && src.trim() !== '' ? src : autoFallback;
  const webpSrc = ensureWebPUrl(rawSrc);

  const [currentSrc, setCurrentSrc] = useState(webpSrc);
  const [retryStage, setRetryStage] = useState<'webp' | 'original' | 'autofallback'>('webp');

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setRetryStage('webp');
    const initialRaw = src && typeof src === 'string' && src.trim() !== '' ? src : autoFallback;
    const initialUrl = ensureWebPUrl(initialRaw);
    setCurrentSrc(initialUrl);

    // If already complete in browser cache
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src, fallbackSrc, alt, categoryOrType]);

  const handleError = () => {
    if (retryStage === 'webp' && currentSrc !== rawSrc) {
      setRetryStage('original');
      setCurrentSrc(rawSrc);
      setIsLoaded(false);
    } else if (retryStage !== 'autofallback' && currentSrc !== autoFallback) {
      setRetryStage('autofallback');
      setCurrentSrc(autoFallback);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  const handleImageRef = (node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node) {
      if (node.complete) {
        if (node.naturalWidth > 0) {
          setIsLoaded(true);
        } else if (!hasError) {
          handleError();
        }
      }
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${className || ''}`}>
      {/* Pulse skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
          <span className="text-[9px] text-gray-400 font-bold tracking-wider">جاري التحميل...</span>
        </div>
      )}

      {/* Fallback image if error occurs */}
      {hasError ? (
        <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center p-2 text-center">
          <img
            src={autoFallback}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <img
          ref={handleImageRef}
          src={currentSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};
