/**
 * API Contracts - NoteAgents / DEEVO CMS
 * Strict TypeScript interfaces for client-server communication
 */

export type Role = 'ADMIN' | 'EDITOR' | 'DEVELOPER' | 'SUPPORT';
export type PageStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
export type AppointmentType = 'CLIENTE' | 'DESENVOLVEDOR' | 'PARCERIA' | 'SUPORTE' | 'OUTRO';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: UserDTO;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface PageDTO {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: PageStatus;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  updatedAt: string;
  createdAt: string;
}

export interface PostDTO {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: PostStatus;
  author: string;
  readTimeMinutes: number;
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
}

export interface MediaDTO {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  sizeBytes: number;
  mimeType: string;
  createdAt: string;
}

export interface BannerDTO {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  position: number;
  active: boolean;
  createdAt: string;
}

export interface AppointmentDTO {
  id: string;
  type: AppointmentType;
  name: string;
  email: string;
  phone: string;
  company?: string;
  reason: string;
  description: string;
  isExistingClient: boolean;
  preferredChannel: 'GOOGLE_MEET' | 'PHONE';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  internalNotes?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  type: AppointmentType;
  name: string;
  email: string;
  phone: string;
  company?: string;
  reason: string;
  description: string;
  isExistingClient: boolean;
  preferredChannel: 'GOOGLE_MEET' | 'PHONE';
  date: string;
  time: string;
}

export interface ProjectDTO {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'AI' | 'WEB' | 'AUTOMATION' | 'FINANCE';
  repositoryUrl?: string;
  demoUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface IntegrationDTO {
  id: string;
  provider: 'whatsapp' | 'email_smtp' | 'google_analytics' | 'gtm' | 'meta_pixel' | 'rd_station' | 'github' | 'vercel';
  name: string;
  description: string;
  connected: boolean;
  config: Record<string, string>;
  updatedAt: string;
}

export interface SeoSettingsDTO {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  canonicalBaseUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  indexingEnabled: boolean;
  autoSitemap: boolean;
}

export interface SiteSettingsDTO {
  siteName: string;
  tagline: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  language: string;
  timezone: string;
  githubUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
}

export interface AuditLogDTO {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ip: string;
  timestamp: string;
  details?: string;
}

export interface SystemLogDTO {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  service: string;
  message: string;
  timestamp: string;
  stack?: string;
}

export interface DashboardMetricsDTO {
  pagesCount: number;
  postsCount: number;
  mediaCount: number;
  bannersCount: number;
  appointmentsCount: number;
  pendingAppointmentsCount: number;
  usersCount: number;
  databaseStatus: 'connected' | 'unconfigured' | 'error';
  siteOnline: boolean;
  lastDeployTime: string;
}
