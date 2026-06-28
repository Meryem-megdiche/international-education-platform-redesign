import {
  Compass,
  School,
  ClipboardCheck,
  FileText,
  FileSearch,
  Languages,
  Plane,
  Home,
  ShieldPlus,
  IdCard,
  Landmark,
  Award,
  BookOpen,
  MessagesSquare,
  Stamp,
  Activity,
  HeartHandshake,
  Users,
  Briefcase,
  Headset,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Academic Orientation',
    description:
      'Personalized guidance to align your goals, background, and budget with the right academic path.',
    icon: Compass,
  },
  {
    title: 'University Selection',
    description:
      'Data-driven shortlists of universities and programs matched to your profile and ambitions.',
    icon: School,
  },
  {
    title: 'Admission Assistance',
    description:
      'End-to-end support through every step of the admission process until you receive your offer.',
    icon: ClipboardCheck,
  },
  {
    title: 'Application Preparation',
    description:
      'Polished applications, motivation letters, and CVs that make your candidacy stand out.',
    icon: FileText,
  },
  {
    title: 'Document Verification',
    description:
      'Careful review of every document to ensure accuracy and full compliance with requirements.',
    icon: FileSearch,
  },
  {
    title: 'Translation Services',
    description:
      'Certified translation of academic and personal documents into the required languages.',
    icon: Languages,
  },
  {
    title: 'Visa Assistance',
    description:
      'Complete student visa support with a 98% approval rate across all destinations.',
    icon: Stamp,
  },
  {
    title: 'Accommodation Support',
    description:
      'Help securing safe, comfortable, and affordable student housing before you arrive.',
    icon: Home,
  },
  {
    title: 'Airport Pickup',
    description:
      'A friendly welcome and safe transfer from the airport to your new accommodation.',
    icon: Plane,
  },
  {
    title: 'Student Insurance',
    description:
      'Guidance on comprehensive health and travel insurance that meets visa requirements.',
    icon: ShieldPlus,
  },
  {
    title: 'Residence Permit Guidance',
    description:
      'Step-by-step assistance obtaining and renewing your residence permit on time.',
    icon: IdCard,
  },
  {
    title: 'Bank Account Assistance',
    description:
      'Support opening a local student bank account quickly and without the hassle.',
    icon: Landmark,
  },
  {
    title: 'Scholarship Guidance',
    description:
      'Identify and apply for scholarships and grants that reduce your cost of study.',
    icon: Award,
  },
  {
    title: 'Language Courses',
    description:
      'Access to preparatory language courses in Italian, Russian, Chinese, and English.',
    icon: BookOpen,
  },
  {
    title: 'Interview Preparation',
    description:
      'Mock interviews and coaching to help you confidently pass admission and visa interviews.',
    icon: MessagesSquare,
  },
  {
    title: 'Document Legalization',
    description:
      'Assistance with apostille, attestation, and legalization of your official documents.',
    icon: FileCheck2,
  },
  {
    title: 'Application Tracking',
    description:
      'Real-time tracking of your application status through your personal dashboard.',
    icon: Activity,
  },
  {
    title: 'Post-Arrival Support',
    description:
      'On-the-ground assistance with registration, settling in, and your first weeks abroad.',
    icon: HeartHandshake,
  },
  {
    title: 'Student Integration',
    description:
      'Community events and mentorship to help you build friendships and feel at home.',
    icon: Users,
  },
  {
    title: 'Career Guidance',
    description:
      'Advice on internships, part-time work, and launching your career after graduation.',
    icon: Briefcase,
  },
  {
    title: 'Continuous Assistance',
    description:
      'A dedicated advisor by your side throughout your entire study-abroad journey.',
    icon: Headset,
  },
]

export type ProcessStep = {
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Free Consultation',
    description:
      'We get to know your goals, academic background, and budget to map out the best path forward.',
  },
  {
    step: '02',
    title: 'University & Program Selection',
    description:
      'Receive a tailored shortlist of universities and programs matched to your profile.',
  },
  {
    step: '03',
    title: 'Application & Documents',
    description:
      'We prepare, verify, translate, and submit a flawless application on your behalf.',
  },
  {
    step: '04',
    title: 'Admission & Acceptance',
    description:
      'Celebrate your offer letter while we guide you through acceptance and enrollment.',
  },
  {
    step: '05',
    title: 'Visa Processing',
    description:
      'Complete visa support, from document preparation to interview coaching and submission.',
  },
  {
    step: '06',
    title: 'Departure & Arrival',
    description:
      'Accommodation, airport pickup, and post-arrival support for a smooth transition.',
  },
]

export type Testimonial = {
  name: string
  program: string
  country: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Yasmine Benali',
    program: 'Medicine, Sapienza University',
    country: 'Italy',
    quote:
      'Zenith handled everything from my application to my visa. I am now studying medicine in Rome — a dream I never thought possible.',
    rating: 5,
  },
  {
    name: 'Karim El-Masry',
    program: 'Engineering, ITMO University',
    country: 'Russia',
    quote:
      'The team found me a scholarship that covered most of my tuition. Their support did not stop once I arrived in Saint Petersburg.',
    rating: 5,
  },
  {
    name: 'Sara Haddad',
    program: 'Business, Tsinghua University',
    country: 'China',
    quote:
      'Professional, responsive, and genuinely caring. They guided me through every document and made the whole process stress-free.',
    rating: 5,
  },
  {
    name: 'Omar Cherif',
    program: 'Dentistry, University of Bologna',
    country: 'Italy',
    quote:
      'From day one I felt supported. The interview preparation gave me the confidence to secure my place. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Lina Tazi',
    program: 'Architecture, Politecnico di Milano',
    country: 'Italy',
    quote:
      'Their attention to detail is unmatched. Every deadline was met and every question answered within hours.',
    rating: 5,
  },
  {
    name: 'Mehdi Saidi',
    program: 'Computer Science, Peking University',
    country: 'China',
    quote:
      'I got accepted into one of the best universities in Asia with a full scholarship. Forever grateful to the Zenith team.',
    rating: 5,
  },
]

export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'How much does it cost to use your services?',
    answer:
      'Your initial consultation is completely free. Our service packages are transparent and tailored to your needs — we will walk you through all options during your consultation with no hidden fees.',
  },
  {
    question: 'Do I need to speak Italian, Russian, or Chinese?',
    answer:
      'Not necessarily. Many programs are taught entirely in English. For programs in the local language, we connect you with preparatory language courses to get you ready.',
  },
  {
    question: 'What are my chances of getting a student visa?',
    answer:
      'Our students enjoy a 98% visa approval rate thanks to meticulous document preparation and interview coaching. We support you through every step of the visa process.',
  },
  {
    question: 'Are scholarships available?',
    answer:
      'Yes. All three destinations offer scholarships ranging from partial tuition discounts to fully funded programs. We help you identify and apply for the ones you qualify for.',
  },
  {
    question: 'How long does the whole process take?',
    answer:
      'It varies by destination and intake, but most students complete the journey from first consultation to departure within 3 to 6 months. We recommend starting early.',
  },
  {
    question: 'What happens after I arrive in my host country?',
    answer:
      'Our support continues well beyond arrival. We assist with registration, residence permits, bank accounts, and integration so you can focus on your studies.',
  },
]
