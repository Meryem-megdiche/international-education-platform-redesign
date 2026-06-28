export const siteConfig = {
  name: 'Zenith Education',
  shortName: 'Zenith',
  tagline: 'Your Gateway to World-Class Education',
  description:
    'A premier international education agency helping students from North Africa and the Middle East study abroad in Italy, Russia, and China.',
  url: 'https://www.zenithedu.example',
  contact: {
    phone: '+212 522 000 000',
    phoneHref: 'tel:+212522000000',
    whatsapp: '212600000000',
    whatsappMessage:
      'Hello Zenith Education, I would like to learn more about studying abroad.',
    email: 'admissions@zenithedu.example',
    address: '124 Boulevard Mohammed V, Casablanca, Morocco',
    mapsQuery: 'Casablanca Morocco',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
}

export type NavItem = {
  title: string
  href: string
  description?: string
}

export const mainNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Countries', href: '/countries' },
  { title: 'Universities', href: '/universities' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
]

export const countriesNav: NavItem[] = [
  {
    title: 'Study in Italy',
    href: '/countries/italy',
    description: 'World-renowned universities, rich culture, affordable tuition.',
  },
  {
    title: 'Study in Russia',
    href: '/countries/russia',
    description: 'Leading programs in medicine, engineering, and sciences.',
  },
  {
    title: 'Study in China',
    href: '/countries/china',
    description: 'Cutting-edge research, scholarships, and global opportunity.',
  },
]

export const footerNav = {
  quickLinks: [
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Testimonials', href: '/testimonials' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Student Guide', href: '/student-guide' },
    { title: 'Visa Guide', href: '/visa-guide' },
  ],
  countries: [
    { title: 'Study in Italy', href: '/countries/italy' },
    { title: 'Study in Russia', href: '/countries/russia' },
    { title: 'Study in China', href: '/countries/china' },
    { title: 'All Universities', href: '/universities' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Contact', href: '/contact' },
    { title: 'Book Consultation', href: '/book' },
  ],
}

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappMessage)
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`
}
