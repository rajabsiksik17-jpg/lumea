import {
  Sparkles,
  UserRound,
  Flower2,
  Heart,
  Droplets,
  Sun,
  Moon,
  Gem,
  Fingerprint,
  Crown,
  Waves,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Music2,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Central icon registry — maps string keys from data files to components.
const registry = {
  Sparkles,
  UserRound,
  Flower2,
  Heart,
  Droplets,
  Sun,
  Moon,
  Gem,
  Fingerprint,
  Crown,
  Waves,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Music2,
  Send,
  ChevronLeft,
  ChevronRight,
}

export function Icon({ name, ...props }) {
  const Cmp = registry[name] || Sparkles
  return <Cmp {...props} />
}

export default Icon
