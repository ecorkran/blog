import React from 'react';
import Image from 'next/image'; 
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils'; 
import BaseCard from './BaseCard'; 

interface BlogCardProps {
  title: string;
  date?: string | Date; 
  excerpt: string;
  coverImageUrl: string;
  className?: string;
  imageMaxHeight?: string; 
  author?: string;   
  priority?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  coverImageUrl,
  imageMaxHeight, // Destructured, used for styling internal image div
  author,
  className,
  priority = false,
  ...baseCardProps
}) => {
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
    <>
      {coverImageUrl && (
        <div className={cn('relative w-full aspect-[16/9] overflow-hidden', imageMaxHeight ? imageMaxHeight : 'min-h-[180px]' )}>
          <Image
            src={coverImageUrl || '/images/placeholder-image.jpg'}
            alt={title || 'Blog post cover image'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 400px"
            className="rounded-t-lg"
            priority={!!priority}
          />
        </div>
      )}
      <div className="pt-4 flex flex-col grow"> 
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        {author && (
          <p className="text-xs text-muted-foreground mb-2">{author}</p>
        )}
        {formattedDate && (
          <p className="text-xs text-muted-foreground mb-2">{formattedDate}</p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-3 grow">
          {excerpt}
        </p>
      </div>
    </>
  );

  return (
    <BaseCard
      className={cn('overflow-hidden', className)}
      {...baseCardProps}
    >
      {cardContent}
    </BaseCard>
  );
};

export default BlogCard;
