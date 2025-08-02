export type ProjectCategory = 'Branding' | 'Packaging' | 'Logo Design' | 'Publication Design' | 'Advertising';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  featured: boolean;
  description: string;
  gallery: string[];
}
