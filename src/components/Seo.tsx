import React, { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const upsertMetaTag = (name: string, content: string, isProperty = false) => {
  if (typeof document === 'undefined') {
    return;
  }
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    if (isProperty) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export const Seo: React.FC<SeoProps> = ({ title, description, ogTitle, ogDescription, ogImage }) => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    if (title) {
      document.title = title;
      upsertMetaTag('og:title', title, true);
    }
  }, [title]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    if (description) {
      upsertMetaTag('description', description);
      upsertMetaTag('og:description', description, true);
    }
  }, [description]);

  useEffect(() => {
    if (ogTitle) {
      upsertMetaTag('og:title', ogTitle, true);
    }
  }, [ogTitle]);

  useEffect(() => {
    if (ogDescription) {
      upsertMetaTag('og:description', ogDescription, true);
    }
  }, [ogDescription]);

  useEffect(() => {
    if (ogImage) {
      upsertMetaTag('og:image', ogImage, true);
    }
  }, [ogImage]);

  return null;
};
