import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';
import BaseCard from '@/components/cards/BaseCard';

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
    image?: string;
  };
}

interface BlogIndexLayoutProps {
  posts: BlogPost[];
  CardComponent: React.ComponentType<{
    title: string;
    date: string;
    excerpt: string;
    coverImageUrl: string;
    imageMaxHeight?: string;
    className?: string;
    priority?: boolean;
  }>;
}

/**
 * Shared layout for the blog index page.
 * Renders header, About Me card, and a list of post cards using a provided CardComponent.
 */
export default function BlogIndexLayout({ posts, CardComponent }: BlogIndexLayoutProps) {
  return (
    <main className="min-h-screen bg-background p-8">
      <BentoLayout
        columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
        rowHeight="minmax(180px,auto)"
        gap={6}
        className="max-w-7xl mx-auto"
        autoFlow="row"
      >
        {/* --- GROUP 1: Title Card --- */}
        <GridItem
          colSpan="lg:col-span-2"
          className="col-start-1"
        >
          <BaseCard 
            className={cn(
              'justify-center items-start',
              'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white p-6 h-full'
            )}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Erik Corkran — Blog</h2>
            <p className="text-sm opacity-90">Blog barely emerging from placeholder status.</p>
          </BaseCard>
        </GridItem>

        {/* Group 2: About Me */}
        <GridItem
          colSpan="lg:col-span-2"
          rowSpan="row-span-1 md:row-span-5 lg:row-span-5 xl:row-span-5"
          className="col-start-1 row-start-2"
        >
          <BaseCard
            className={cn(
              'justify-start items-start',
              'bg-slate-800 text-slate-200 p-6 h-full'
            )}
          >
            <h3 className="text-xl font-semibold mb-3">About Me</h3>
            <p className="text-sm mb-3">
              I’m exploring the cutting edge of AI to push past basic automation, creating powerful software for everything from financial market insights to action-packed games—and even this website.
            </p>
            <p className="text-sm mb-3">
              I’m open to part-time or contract roles where I can help companies leverage AI effectively, especially in fintech or innovative engineering projects.
            </p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Connect</h4>
            <p className="text-sm">
              Feel free to reach out if you have questions or just want to chat about technology.
            </p>
            <div className="flex gap-8 mt-8">
              <a
                href="https://github.com/ecorkran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 flex items-center justify-center rounded-[8px] bg-slate-900 border border-slate-600 text-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:scale-105"
              >
                {/* GitHub SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/erikcorkran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 flex items-center justify-center rounded-[8px] bg-slate-900 border border-slate-600 text-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:scale-105"
              >
                {/* LinkedIn SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z" />
                </svg>
              </a>
              <a
                href="https://x.com/ecorkran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-12 h-12 flex items-center justify-center rounded-[8px] bg-slate-900 border border-slate-600 text-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:scale-105"
              >
                {/* X (Twitter) SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="mailto:erik@erikcorkran.com"
                aria-label="Email"
                className="w-12 h-12 flex items-center justify-center rounded-[8px] bg-slate-900 border border-slate-600 text-slate-200 transition-all duration-200 ease-in-out hover:bg-slate-800 hover:border-slate-500 hover:text-white hover:scale-105"
              >
                {/* Email SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64" />
                </svg>
              </a>
            </div>

          </BaseCard>
        </GridItem>

        {/* Group 3: Blog Posts */}
        {posts.map((post, index) => (
          <GridItem
            key={post.slug}
            colSpan={{ md: 'col-span-2', lg: 'col-span-4' }}
            className={cn(
              'md:col-start-2 lg:col-start-3',
              index === 0 && 'md:row-start-1 lg:row-start-1'
            )}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <CardComponent
                title={post.frontmatter.title}
                date={post.frontmatter.pubDate}
                excerpt={post.frontmatter.description}
                coverImageUrl={post.frontmatter.image || '/images/placeholder-image.jpg'}
                imageMaxHeight="h-[200px]"
                className="h-full"
                priority={index === 0}
              />
            </Link>
          </GridItem>
        ))}
      </BentoLayout>
    </main>
  );
}
