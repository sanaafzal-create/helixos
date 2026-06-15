'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

export function Logo({ variant = 'full', size = 'md', href = '/', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 28, height: 28, iconWidth: 20, iconHeight: 20 },
    md: { width: 40, height: 40, iconWidth: 28, iconHeight: 28 },
    lg: { width: 56, height: 56, iconWidth: 40, iconHeight: 40 },
  }

  const { width, height, iconWidth, iconHeight } = sizeMap[size]

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
