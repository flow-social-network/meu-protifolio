import {
  AuthLoginRequest,
  AuthLoginResponse,
  CreateAppointmentRequest,
  PageDTO,
  PostDTO,
  MediaDTO,
  BannerDTO,
  AppointmentDTO,
  ProjectDTO,
  IntegrationDTO,
  SeoSettingsDTO,
  SiteSettingsDTO,
  AuditLogDTO,
  SystemLogDTO,
  DashboardMetricsDTO,
  UserDTO
} from '@/contracts/index';

const TOKEN_KEY = 'noteagents_auth_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY)
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Erro inesperado no servidor' }));
    throw new Error(errorData.error || `HTTP ${response.status}: Falha na requisição`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (credentials: AuthLoginRequest) =>
      request<AuthLoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
    me: () => request<UserDTO>('/api/auth/me'),
    logout: () => request<{ success: boolean }>('/api/auth/logout', { method: 'POST' }),
    resetPassword: (email: string) =>
      request<{ message: string }>('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      })
  },
  public: {
    getSettings: () => request<{ site: SiteSettingsDTO; seo: SeoSettingsDTO }>('/api/public/settings'),
    getPage: (slug: string) => request<PageDTO>(`/api/public/pages/${slug}`),
    getPosts: () => request<PostDTO[]>('/api/public/posts'),
    getPost: (slug: string) => request<PostDTO>(`/api/public/posts/${slug}`),
    getProjects: () => request<ProjectDTO[]>('/api/public/projects'),
    getBanners: () => request<BannerDTO[]>('/api/public/banners'),
    createAppointment: (data: CreateAppointmentRequest) =>
      request<AppointmentDTO>('/api/public/appointments', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  },
  dashboard: {
    getMetrics: () => request<DashboardMetricsDTO>('/api/dashboard')
  },
  pages: {
    list: () => request<PageDTO[]>('/api/pages'),
    get: (id: string) => request<PageDTO>(`/api/pages/${id}`),
    create: (data: Partial<PageDTO>) =>
      request<PageDTO>('/api/pages', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<PageDTO>) =>
      request<PageDTO>(`/api/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/api/pages/${id}`, { method: 'DELETE' })
  },
  posts: {
    list: () => request<PostDTO[]>('/api/posts'),
    get: (id: string) => request<PostDTO>(`/api/posts/${id}`),
    create: (data: Partial<PostDTO>) =>
      request<PostDTO>('/api/posts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<PostDTO>) =>
      request<PostDTO>(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/api/posts/${id}`, { method: 'DELETE' })
  },
  media: {
    list: () => request<MediaDTO[]>('/api/media'),
    upload: (data: Partial<MediaDTO>) =>
      request<MediaDTO>('/api/media', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/api/media/${id}`, { method: 'DELETE' })
  },
  banners: {
    list: () => request<BannerDTO[]>('/api/banners'),
    create: (data: Partial<BannerDTO>) =>
      request<BannerDTO>('/api/banners', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<BannerDTO>) =>
      request<{ success: boolean }>(`/api/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/api/banners/${id}`, { method: 'DELETE' })
  },
  appointments: {
    list: () => request<AppointmentDTO[]>('/api/appointments'),
    get: (id: string) => request<AppointmentDTO>(`/api/appointments/${id}`),
    update: (id: string, data: Partial<AppointmentDTO>) =>
      request<AppointmentDTO>(`/api/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  },
  projects: {
    list: () => request<ProjectDTO[]>('/api/projects'),
    create: (data: Partial<ProjectDTO>) =>
      request<ProjectDTO>('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ProjectDTO>) =>
      request<{ success: boolean }>(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/api/projects/${id}`, { method: 'DELETE' })
  },
  repositories: {
    list: () => request<{ connected: boolean; repositories: any[] }>('/api/repositories'),
    sync: () => request<{ success: boolean; message: string }>('/api/repositories/sync', { method: 'POST' })
  },
  deployments: {
    list: () => request<any[]>('/api/deployments'),
    redeploy: () => request<{ success: boolean; message: string }>('/api/deployments/redeploy', { method: 'POST' })
  },
  integrations: {
    list: () => request<IntegrationDTO[]>('/api/integrations'),
    connect: (id: string, config?: Record<string, string>) =>
      request<{ success: boolean }>(`/api/integrations/${id}/connect`, {
        method: 'POST',
        body: JSON.stringify({ config })
      }),
    disconnect: (id: string) =>
      request<{ success: boolean }>(`/api/integrations/${id}/disconnect`, { method: 'POST' })
  },
  seo: {
    get: () => request<SeoSettingsDTO>('/api/seo'),
    update: (data: Partial<SeoSettingsDTO>) =>
      request<SeoSettingsDTO>('/api/seo', { method: 'PUT', body: JSON.stringify(data) })
  },
  settings: {
    get: () => request<SiteSettingsDTO>('/api/settings'),
    update: (data: Partial<SiteSettingsDTO>) =>
      request<SiteSettingsDTO>('/api/settings', { method: 'PUT', body: JSON.stringify(data) })
  },
  users: {
    list: () => request<UserDTO[]>('/api/users'),
    create: (data: any) => request<UserDTO>('/api/users', { method: 'POST', body: JSON.stringify(data) })
  },
  audit: {
    list: () => request<AuditLogDTO[]>('/api/audit')
  },
  logs: {
    list: () => request<SystemLogDTO[]>('/api/logs')
  }
};
