export type CountryInfo = {
  slug: string
  name: string
  flag: string
  image: string
  tagline: string
  overview: string
  highlights: { label: string; value: string }[]
  educationSystem: string
  admissionRequirements: string[]
  visaProcess: { step: string; detail: string }[]
  tuition: string
  livingCosts: string
  accommodation: string[]
  studentLife: string
  faqs: { question: string; answer: string }[]
}

export const countries: CountryInfo[] = [
  {
    slug: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    image: '/images/italy.png',
    tagline: 'World-renowned universities, rich culture, and affordable tuition.',
    overview:
      'Italy is home to some of the oldest and most prestigious universities in the world, offering high-quality education at remarkably affordable tuition fees. With hundreds of English-taught programs, generous regional scholarships, and an unmatched lifestyle, Italy is a top choice for international students.',
    highlights: [
      { label: 'Public Tuition', value: 'from €1,000/yr' },
      { label: 'English Programs', value: '500+' },
      { label: 'Living Cost', value: '€700–1,000/mo' },
      { label: 'Work Rights', value: '20 hrs/week' },
    ],
    educationSystem:
      'The Italian higher education system follows the European three-cycle structure: Bachelor (Laurea, 3 years), Master (Laurea Magistrale, 2 years), and Doctorate. Degrees are recognized across Europe and worldwide thanks to the Bologna Process.',
    admissionRequirements: [
      'High school diploma (translated and legalized)',
      'Academic transcripts',
      'Valid passport',
      'Language certificate (English IELTS/TOEFL or Italian B1–B2)',
      'Motivation letter and CV',
      'Pre-enrollment via Universitaly portal',
    ],
    visaProcess: [
      { step: 'Acceptance', detail: 'Receive your university acceptance and complete pre-enrollment.' },
      { step: 'Documents', detail: 'Prepare proof of funds, accommodation, and health insurance.' },
      { step: 'Application', detail: 'Submit your Type D study visa application at the Italian consulate.' },
      { step: 'Interview', detail: 'Attend a short visa interview with our coaching support.' },
      { step: 'Arrival', detail: 'Apply for your residence permit within 8 days of arriving.' },
    ],
    tuition:
      'Public universities charge between €1,000 and €4,000 per year, with fees often scaled to family income. Private universities range from €6,000 to €20,000 per year.',
    livingCosts:
      'Expect €700–1,000 per month covering accommodation, food, transport, and personal expenses, depending on the city. Southern cities are more affordable than Milan or Rome.',
    accommodation: [
      'University dormitories (limited, apply early)',
      'Shared private apartments',
      'Student residences (DSU-funded for scholarship holders)',
    ],
    studentLife:
      'From the canals of Venice to the fashion of Milan, Italy offers an extraordinary student experience filled with history, art, cuisine, and a warm, welcoming culture.',
    faqs: [
      { question: 'Can I study in Italy in English?', answer: 'Yes. Hundreds of Bachelor and Master programs are taught entirely in English across Italian universities.' },
      { question: 'Are scholarships available?', answer: 'Yes. Regional DSU scholarships, university grants, and government scholarships can cover tuition, meals, and accommodation based on merit and income.' },
      { question: 'Can I work while studying?', answer: 'International students may work up to 20 hours per week during their studies.' },
    ],
  },
  {
    slug: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    image: '/images/russia.png',
    tagline: 'Leading programs in medicine, engineering, and the sciences.',
    overview:
      'Russia offers globally respected education, particularly in medicine, engineering, and the natural sciences, at some of the most affordable tuition fees in the world. With a fast, high-approval visa process and quality dormitories, Russia is an excellent destination for ambitious students.',
    highlights: [
      { label: 'Tuition', value: 'from $3,500/yr' },
      { label: 'English Programs', value: '300+' },
      { label: 'Living Cost', value: '$300–500/mo' },
      { label: 'Visa Approval', value: 'Very High' },
    ],
    educationSystem:
      'Russian higher education offers Specialist degrees (especially in medicine), Bachelor (4 years), Master (2 years), and Doctorate programs. Many universities are ranked among the world\u2019s best for STEM and medical fields.',
    admissionRequirements: [
      'High school diploma (translated and legalized)',
      'Academic transcripts',
      'Valid passport',
      'Medical certificate and HIV test',
      'University invitation letter',
      'Language proof (English or Russian foundation year)',
    ],
    visaProcess: [
      { step: 'Invitation', detail: 'The university issues an official invitation letter (takes 3–5 weeks).' },
      { step: 'Documents', detail: 'Prepare passport, photos, medical certificate, and invitation.' },
      { step: 'Application', detail: 'Submit your student visa application at the Russian consulate.' },
      { step: 'Entry Visa', detail: 'Receive a single-entry visa valid for 90 days.' },
      { step: 'Registration', detail: 'Convert to a multi-entry visa and register within 7 days of arrival.' },
    ],
    tuition:
      'Tuition ranges from $3,500 to $7,000 per year depending on the university and program. Medical programs at top universities remain highly competitive and affordable.',
    livingCosts:
      'Living costs are very affordable at $300–500 per month, including dormitory accommodation, food, and transport.',
    accommodation: [
      'University dormitories (affordable, on or near campus)',
      'Shared private apartments',
      'Studio rentals in city centers',
    ],
    studentLife:
      'Russia combines a rich cultural heritage with vibrant student communities, world-famous museums, theaters, and a strong international student network.',
    faqs: [
      { question: 'Is the degree internationally recognized?', answer: 'Yes. Russian degrees, especially in medicine and engineering, are recognized worldwide and by the WHO directory.' },
      { question: 'Do I need to speak Russian?', answer: 'Many programs are taught in English. For Russian-taught programs, a one-year preparatory foundation course is available.' },
      { question: 'How long does the visa take?', answer: 'After receiving your invitation letter, the visa itself is typically issued within 2–3 weeks.' },
    ],
  },
  {
    slug: 'china',
    name: 'China',
    flag: '🇨🇳',
    image: '/images/china.png',
    tagline: 'Cutting-edge research, generous scholarships, and global opportunity.',
    overview:
      'China has rapidly become a global education hub, home to world-top universities, state-of-the-art facilities, and some of the most generous scholarship programs available. A degree from China opens doors to one of the world\u2019s largest and fastest-growing economies.',
    highlights: [
      { label: 'Tuition', value: 'from $2,800/yr' },
      { label: 'Scholarships', value: 'Full & Partial' },
      { label: 'Living Cost', value: '$400–700/mo' },
      { label: 'Top Universities', value: 'Global Top 50' },
    ],
    educationSystem:
      'Chinese higher education offers Bachelor (4 years), Master (2–3 years), and Doctorate programs. Universities such as Tsinghua and Fudan rank among the best globally, with growing numbers of English-taught degrees.',
    admissionRequirements: [
      'High school or bachelor diploma (notarized)',
      'Academic transcripts',
      'Valid passport',
      'Physical examination record',
      'Study plan or motivation letter',
      'Language proof (English or HSK for Chinese-taught programs)',
    ],
    visaProcess: [
      { step: 'Admission', detail: 'Receive your admission notice and JW202 form from the university.' },
      { step: 'Documents', detail: 'Prepare passport, photos, admission notice, and JW202 form.' },
      { step: 'Application', detail: 'Apply for the X1 visa (studies over 180 days) at the Chinese consulate.' },
      { step: 'Entry', detail: 'Enter China and complete a health check.' },
      { step: 'Residence Permit', detail: 'Convert your visa to a residence permit within 30 days of arrival.' },
    ],
    tuition:
      'Tuition ranges from $2,800 to $6,000 per year. Many students receive Chinese Government Scholarships (CSC) or university scholarships covering tuition and living stipends.',
    livingCosts:
      'Living costs range from $400–700 per month depending on the city, covering accommodation, food, and transport.',
    accommodation: [
      'On-campus international student dormitories',
      'Shared off-campus apartments',
      'University-arranged housing for scholarship students',
    ],
    studentLife:
      'China offers a fascinating blend of ancient culture and ultramodern cities, with thriving international communities, modern campuses, and abundant travel opportunities.',
    faqs: [
      { question: 'Can I get a full scholarship?', answer: 'Yes. The Chinese Government Scholarship and university scholarships can cover full tuition, accommodation, and a monthly stipend.' },
      { question: 'Are programs taught in English?', answer: 'Yes. Many undergraduate and most graduate programs offer English-taught tracks.' },
      { question: 'Do I need to learn Chinese?', answer: 'Not for English-taught programs, though basic Mandarin helps daily life. Chinese-taught programs require an HSK certificate.' },
    ],
  },
]

export function getCountry(slug: string) {
  return countries.find((c) => c.slug === slug) ?? null
}
