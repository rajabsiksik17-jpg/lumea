import { ArrowLeft } from 'lucide-react'
import { scrollToSection } from '../utils/scrollTo.js'

const variants = {
  primary:
    'bg-ink text-cream hover:bg-[#2a2420] border border-ink',
  light:
    'bg-cream text-ink hover:bg-beige border border-cream',
  outline:
    'bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-cream',
  outlineLight:
    'bg-transparent text-cream border border-cream/40 hover:bg-cream hover:text-ink',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  arrow = true,
  className = '',
  type = 'button',
  ...rest
}) {
  const isAnchor = href && href.startsWith('#')

  const handleClick = (e) => {
    if (isAnchor) {
      e.preventDefault()
      scrollToSection(href)
    }
    if (onClick) onClick(e)
  }

  const classes = [
    'group inline-flex items-center gap-3 px-8 py-4 text-[0.72rem] uppercase tracking-widest2 transition-all duration-500 ease-smooth rounded-full',
    variants[variant],
    className,
  ].join(' ')

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative inline-flex items-center transition-transform duration-500 ease-smooth group-hover:-translate-x-1">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}
    </>
  )

  if (isAnchor) {
    return (
      <a href={href} className={classes} onClick={handleClick} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={handleClick} {...rest}>
      {content}
    </button>
  )
}
