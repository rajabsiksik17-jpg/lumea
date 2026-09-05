import { useState } from 'react'

// Image with lazy loading and a graceful beige fallback if the URL fails.
// Centralized so external images can be swapped without touching sections.
export default function SmartImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  eager = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-beige ${className}`}
        role="img"
        aria-label={alt}
        {...rest}
      >
        <span className="font-serif text-2xl font-light italic text-muted/50">LUMÉA</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
