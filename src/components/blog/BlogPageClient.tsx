"use client";
import React from 'react';

import BlogIndexLayout, { BlogPost } from '../../app/blog/BlogIndexLayout';
import { BlogCardImage } from '@/components/cards/BlogCardImage';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <BlogIndexLayout posts={posts} CardComponent={BlogCardImage} />
  );
}
