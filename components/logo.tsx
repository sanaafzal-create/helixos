'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'icon' | 'icon-text'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  className?: string
}

export function Logo({ variant = 'icon-text', size = 'md', href = '/', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 28, height: 28, iconWidth: 20, iconHeight: 20, textSize: 'text-sm' },
    md: { width: 40, height: 40, iconWidth: 28, iconHeight: 28, textSize: 'text-lg' },
    lg: { width: 56, height: 56, iconWidth: 40, iconHeight: 40, textSize: 'text-2xl' },
    xl: { width: 72, height: 72, iconWidth: 56, iconHeight: 56, textSize: 'text-3xl' },
  }

  const { width, height, iconWidth, iconHeight, textSize } = sizeMap[size]

  const logoContent =
    variant === 'icon' ? (
      <Image
        src="/logo-icon.png"
        alt="HelixOS"
        width={iconWidth}
        height={iconHeight}
        priority
        className="object-contain"
      />
    ) : variant === 'icon-text' ? (
      <div className="flex items-center gap-2">
        <Image
          src="/logo-icon.png"
          alt="HelixOS"
          width={iconWidth}
          height={iconHeight}
          priority
          className="object-contain"
        />
        <span className={`font-bold ${textSize}`} style={{ color: '#06B6D4' }}>
          HelixOS
        </span>
      </div>
    ) : (
      <Image
        src="/logo.png"
        alt="HelixOS"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    )

  if (href) {
    return (
      <Link href={href} className={`inline-flex items-center ${className}`}>
        {logoContent}
      </Link>
    )
  }

  return <div className={`inline-flex items-center ${className}`}>{logoContent}</div>
}
