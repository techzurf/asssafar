import React from 'react';
import { BRAND_INFO } from '../data/content';

interface LogoProps {
  className?: string;
  loading?: 'eager' | 'lazy';
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * Shared central As-Safar Logo component
 * Renders the official logo with preserved aspect ratio (object-fit: contain)
 * and transparency.
 */
export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 sm:h-12 w-auto object-contain',
  loading = 'lazy',
  alt = 'As-Safar Hajj & Umrah Services',
  width = 144,
  height = 48,
}) => {
  return (
    <img
      src={BRAND_INFO.logoUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
};
