import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  UserDTO,
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
  DashboardMetricsDTO
} from '@/contracts/index';

export interface DatabaseState {
  users: Array<UserDTO & { passwordHash: string }>;
  pages: PageDTO[];
  pageRevisions: Array<{ id: string; pageId: string; content: string; createdAt: string }>;
  posts: PostDTO[];
  media: MediaDTO[];
  banners: BannerDTO[];
  appointments: AppointmentDTO[];
  projects: ProjectDTO[];
  integrations: IntegrationDTO[];
  seoSettings: SeoSettingsDTO;
  siteSettings: SiteSettingsDTO;
  auditLogs: AuditLogDTO[];
  systemLogs: SystemLogDTO[];
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Initial default state - only administrative baseline, NO fake demo lists.
const getDefaultState = (): DatabaseState => ({
  users: [
    {
      id: 'usr_admin_1',
      name: 'Vini Amaral',
      email: 'vini@deevo.com.br',
      role: 'ADMIN',
      avatarUrl: '/icon.svg',
      createdAt: new Date().toISOString(),
      passwordHash: crypto.createHash('sha256').update('admin123').digest('hex')
    },
    {
      id: 'usr_admin_2',
      name: 'Administrador DEEVO',
      email: 'contato@deevofinanceiras.com.br',
      role: 'ADMIN',
      avatarUrl: '/icon.svg',
      createdAt: new Date().toISOString(),
      passwordHash: crypto.createHash('sha256').update('admin123').digest('hex')
    }
  ],
  pages: [],
  pageRevisions: [],
  posts: [],
  media: [],
  banners: [],
  appointments: [],
  projects: [
    {
      id: 'proj_noteagents',
      name: 'NoteAgents',
      slug: 'noteagents',
      tagline: 'AI Engineering Control Plane',
      description: 'Plataforma open source de engenharia de software assistida por IA. Coordena projetos, agentes, código, testes, auditoria, observabilidade e deployment.',
      technologies: ['Next.js', 'TypeScript', 'IA', 'Open Source'],
      category: 'AI',
      repositoryUrl: 'https://github.com/deevo-solucoes/noteagents',
      demoUrl: 'https://noteagents.deevo.com.br',
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj_deevo',
      name: 'DEEVO Soluções Financeiras',
      slug: 'deevo-financeiro',
      tagline: 'Sistemas Financeiros e Gestão',
      description: 'Soluções completas para gestão financeira, automação de processos e inteligência de dados.',
      technologies: ['Web', 'Cloud', 'Integrações', 'Dashboard'],
      category: 'FINANCE',
      demoUrl: 'https://deevo.com.br',
      featured: true,
      createdAt: new Date().toISOString()
    }
  ],
  integrations: [
    {
      id: 'int_whatsapp',
      provider: 'whatsapp',
      name: 'WhatsApp Business API',
      description: 'Notificações e atendimento direto via WhatsApp.',
      connected: false,
      config: {},
      updatedAt: new Date().toISOString()
    },
    {
      id: 'int_email',
      provider: 'email_smtp',
      name: 'E-mail Transacional (SMTP)',
      description: 'Envio de confirmações de agendamento e recuperação de senha.',
      connected: false,
      config: {},
      updatedAt: new Date().toISOString()
    },
    {
      id: 'int_ga',
      provider: 'google_analytics',
      name: 'Google Analytics 4',
      description: 'Métricas de tráfego e visualizações de páginas.',
      connected: false,
      config: {},
      updatedAt: new Date().toISOString()
    },
    {
      id: 'int_github',
      provider: 'github',
      name: 'GitHub Sync',
      description: 'Sincronização de repositórios, releases e deploys.',
      connected: false,
      config: {},
      updatedAt: new Date().toISOString()
    },
    {
      id: 'int_vercel',
      provider: 'vercel',
      name: 'Vercel Deployment Platform',
      description: 'Monitoramento de deploys e publicação contínua.',
      connected: false,
      config: {},
      updatedAt: new Date().toISOString()
    }
  ],
  seoSettings: {
    siteTitle: 'NoteAgents — Engenharia de Software Assistida por IA',
    siteDescription: 'Plataforma open source de engenharia de software assistida por IA. Coordena projetos, agentes de IA, código, testes, auditoria, observabilidade e deployment.',
    keywords: ['NoteAgents', 'IA', 'Engenharia de Software', 'DEEVO', 'Open Source', 'Agentes'],
    canonicalBaseUrl: 'https://deevo.com.br',
    ogTitle: 'NoteAgents — Engenharia de Software Assistida por IA',
    ogDescription: 'Plataforma open source de engenharia de software assistida por IA.',
    ogImage: '/icon.svg',
    indexingEnabled: true,
    autoSitemap: true
  },
  siteSettings: {
    siteName: 'DEEVO Soluções Financeiras LTDA',
    tagline: 'Crédito com segurança, para um futuro melhor.',
    siteUrl: 'https://deevofinanceiras.com.br',
    contactEmail: 'contato@deevofinanceiras.com.br',
    contactPhone: '(51) 3786-6302',
    cnpj: '63.187.175/0001-70',
    address: 'Brasil — Atendimento Nacional',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo (GMT-3)',
    githubUrl: 'https://github.com/deevo-solucoes',
    linkedinUrl: 'https://linkedin.com/in/viniamaral',
    whatsappNumber: '555137866302'
  },
  auditLogs: [
    {
      id: 'aud_init',
      action: 'SYSTEM_BOOT',
      resource: 'SYSTEM',
      ip: '127.0.0.1',
      details: 'Sistema NoteAgents iniciado e arquitetura de banco provisionada.',
      timestamp: new Date().toISOString()
    }
  ],
  systemLogs: [
    {
      id: 'log_boot',
      level: 'info',
      service: 'API_GATEWAY',
      message: 'Servidor REST inicializado na porta 3000.',
      timestamp: new Date().toISOString()
    }
  ]
});

class StorageEngine {
  private state: DatabaseState;

  constructor() {
    this.state = this.load();
  }

  private load(): DatabaseState {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    const def = getDefaultState();
    this.save(def);
    return def;
  }

  private save(state: DatabaseState) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting database state to disk:', err);
    }
  }

  getState(): DatabaseState {
    return this.state;
  }

  updateState(fn: (prev: DatabaseState) => DatabaseState): DatabaseState {
    this.state = fn(this.state);
    this.save(this.state);
    return this.state;
  }

  logAudit(action: string, resource: string, details?: string, userId?: string, userName?: string, ip = '127.0.0.1') {
    const entry: AuditLogDTO = {
      id: 'aud_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      action,
      resource,
      details,
      userId,
      userName,
      ip,
      timestamp: new Date().toISOString()
    };
    this.updateState((prev) => ({
      ...prev,
      auditLogs: [entry, ...prev.auditLogs].slice(0, 100)
    }));
  }

  logSystem(level: 'info' | 'warning' | 'error' | 'critical', service: string, message: string, stack?: string) {
    const entry: SystemLogDTO = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      level,
      service,
      message,
      stack,
      timestamp: new Date().toISOString()
    };
    this.updateState((prev) => ({
      ...prev,
      systemLogs: [entry, ...prev.systemLogs].slice(0, 100)
    }));
  }

  getMetrics(): DashboardMetricsDTO {
    const s = this.state;
    const hasNeonConfigured = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('ep-sample');
    return {
      pagesCount: s.pages.length,
      postsCount: s.posts.length,
      mediaCount: s.media.length,
      bannersCount: s.banners.length,
      appointmentsCount: s.appointments.length,
      pendingAppointmentsCount: s.appointments.filter((a) => a.status === 'SCHEDULED').length,
      usersCount: s.users.length,
      databaseStatus: hasNeonConfigured ? 'connected' : 'unconfigured',
      siteOnline: true,
      lastDeployTime: new Date().toISOString()
    };
  }
}

export const db = new StorageEngine();
