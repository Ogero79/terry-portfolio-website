import { Project, ProjectCategory } from './types';
import { BrandingIcon, PackagingIcon, AdvertisingIcon } from './components/icons';

export const PROJECTS: Project[] = [
    {
    id: 1,
    title: 'Belmont',
    category: 'Packaging',
    image: '/images/hp/packaging.png',
    featured: true,
    description: "Shwepi, a new player in the organic snack market, needed packaging that would pop on crowded shelves. We designed a vibrant and playful packaging system that highlights the natural ingredients and appeals to health-conscious consumers. The design is not only eye-catching but also practical, ensuring product freshness and a positive user experience.",
    gallery: [
      'https://images.unsplash.com/photo-1594905385633-49d936551a6c?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622483727542-fad66a273e34?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587593202394-1a9a839d3df3?q=80&w=1935&auto=format&fit=crop',
    ]
  },
    {
    id: 2,
    title: 'Maridadi Restaurant',
    category: 'Branding',
    image: '/images/maridadi/maridadi.png',
    featured: true,
    description: "Crafting a compelling brand identity goes beyond just a logo—it's about creating a cohesive visual story that resonates with your audience. From logos to color schemes, typography, and branding guidelines, every element is designed to reflect your values and make a lasting impact. Whether you’re building a new brand or refreshing an existing one, I’m here to help you stand out.",
    gallery: [
      '/images/hp/logo-design.png',
      '/images/maridadi/maridadi.png',
    ]
  },
  {
    id: 3,
    title: 'World a Small Village',
    category: 'Publication Design',
    image: '/images/hp/book-cover.png',
    featured: true,
    description: "Publication design combines the art of storytelling with impactful visuals to create engaging books, magazines, brochures, and digital content. Through thoughtful typography, layout, and imagery, each page is crafted to captivate readers and communicate your message effectively. Whether in print or digital format, I design publications that are visually appealing and highly functional, ensuring your content shines.",
    gallery: [
      '/images/hp/book-cover.png',
    ]
  },
  {
    id: 4,
    title: 'Young Trumpeters',
    category: 'Logo Design',
    image: '/images/hp/logo-designing.png',
    featured: true,
    description: "A logo is the cornerstone of your brand identity—a visual symbol that represents your values, vision, and personality. I specialize in designing logos that are timeless, versatile, and memorable, ensuring they resonate with your audience and leave a lasting impression. Whether you’re starting fresh or rebranding, I’ll craft a logo that speaks for your brand.",
    gallery: [
      '/images/hp/logo-designing.png',
    ]
  },
  {
    id: 5,
    title: 'Shwepi',
    category: 'Packaging',
    image: '/images/hp/packaging.png',
    featured: false,
    description: "Packaging is more than just a container—it’s your brand’s first impression. A well-designed package not only protects your product but also tells a story, grabs attention, and connects with your customers. Whether it’s minimalist, eco-friendly, or bold and colorful, I create packaging that enhances your product and leaves a lasting impact on the shelves.",
    gallery: [
      '/images/hp/packaging.png',
    ]
  },
];

export const CATEGORIES: (ProjectCategory | 'All')[] = ['All', 'Branding', 'Packaging', 'Logo Design', 'Publication Design', 'Advertising'];

export const SERVICES = [
  {
    icon: BrandingIcon,
    title: "Branding",
    description: "Crafting memorable brand identities that tell your story and resonate with your audience."
  },
  {
    icon: AdvertisingIcon,
    title: "Advertising",
    description: "Designing impactful ad campaigns that capture attention and drive results across all media."
  },
  {
    icon: PackagingIcon,
    title: "Packaging",
    description: "Designing stunning product packaging that stands out on the shelf and captivates customers."
  }
];