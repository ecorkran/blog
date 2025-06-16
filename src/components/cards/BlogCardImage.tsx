import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import BaseCard, { BaseCardProps } from './BaseCard'; // Assuming BaseCard provides base styling like rounded corners

export interface BlogCardImageProps extends Omit<BaseCardProps, 'children' | 'variant' | 'size'> {
  title: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string;
  coverImageUrl: string; // Required for this card type
  category?: string;
  author?: string;
  // Props specific to how the text overlays the image, e.g., text color, overlay opacity
  textColorClassName?: string; // e.g., 'text-white'
  overlayClassName?: string;   // e.g., 'bg-black/50' for a dark scrim
  imageMaxHeight?: string; // Consumed to prevent passing to BaseCard
  priority?: boolean;
}

export const BlogCardImage: React.FC<BlogCardImageProps> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  textColorClassName = 'text-white', // Default to white text
  overlayClassName = 'bg-gradient-to-t from-black/50 via-black/35 to-black/25',
  imageMaxHeight, // Destructured, not used by this component directly
  className,
  priority = false,
  ...baseCardProps
}) => {
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
    <div className={cn('relative h-full w-full flex flex-col justify-end p-6 md:p-8', textColorClassName)}>
      {/* Overlay for text readability */}
      <div className={cn('absolute inset-0 z-0', overlayClassName)} />

      {/* Text content, ensure it's above the overlay */}
      <div className="relative z-10">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1">{category}</p>
        )}
        <h3 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-3">{title}</h3>
        {excerpt && (
          <p className="text-sm md:text-base opacity-90 mb-3 line-clamp-2 md:line-clamp-3">
            {excerpt}
          </p>
        )}
        <div className="flex items-center text-xs opacity-80">
          {author && <span>By {author}</span>}
          {author && formattedDate && <span className="mx-2">•</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <BaseCard 
      className={cn(
        'relative overflow-hidden h-full w-full group',
        imageMaxHeight ? imageMaxHeight : 'min-h-[280px] md:min-h-[360px]',
        className
      )}
      // We don't pass variant or size to BaseCard from here, as this card has a very specific style
      {...baseCardProps} 
    >
      {/* Background Image with zoom-on-hover */}
      <Image
        src={coverImageUrl || '/images/placeholder-image.jpg'}
        alt={title ? `Background for ${title}` : 'Blog post cover image'}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 400px"
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
        priority={!!priority}
      />
      {/* 25% black dim overlay above the image but below text overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />
      {slug ? (
        <Link href={slug} className="absolute inset-0 z-20" aria-label={`Read more about ${title}`}>
          {/* Link covers the whole card, content is for visual rendering */}
          {cardContent}
        </Link>
      ) : (
        <div className="absolute inset-0 z-20">
          {cardContent}
        </div>
      )}
    </BaseCard>
  );
};
