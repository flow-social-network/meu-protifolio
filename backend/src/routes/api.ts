import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db } from '../db/storage';
import {
  AuthLoginRequest,
  CreateAppointmentRequest,
  PageDTO,
  PostDTO,
  MediaDTO,
  BannerDTO,
  ProjectDTO,
  SeoSettingsDTO,
  SiteSettingsDTO
} from '@/contracts/index';

export const apiRouter = Router();

// Middleware: Authenticate Bearer token
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Não autorizado: Token não fornecido.' });
    return;
  }
  const token = authHeader.split(' ')[1];
  // Simple session check: token format "token_usr_..."
  if (!token || !token.startsWith('token_')) {
    res.status(401).json({ error: 'Sessão inválida ou expirada.' });
    return;
  }
  const userId = token.replace('token_', '');
  const user = db.getState().users.find((u) => u.id === userId);
  if (!user) {
    res.status(401).json({ error: 'Usuário não encontrado.' });
    return;
  }
  (req as any).user = user;
  next();
}

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body as AuthLoginRequest;
  if (!email || !password) {
    res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    return;
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const user = db.getState().users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.passwordHash !== hash) {
    db.logAudit('AUTH_FAILED', 'USER', `Tentativa de login falha para ${email}`, undefined, undefined, req.ip);
    res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
    return;
  }

  const token = `token_${user.id}`;
  db.logAudit('AUTH_SUCCESS', 'USER', `Login realizado com sucesso por ${user.name}`, user.id, user.name, req.ip);

  const { passwordHash: _, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

apiRouter.get('/auth/me', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { passwordHash: _, ...safeUser } = user;
  res.json(safeUser);
});

apiRouter.post('/auth/logout', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  db.logAudit('AUTH_LOGOUT', 'USER', `Logout efetuado por ${user.name}`, user.id, user.name, req.ip);
  res.json({ success: true });
});

apiRouter.post('/auth/reset-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'E-mail é obrigatório.' });
    return;
  }
  db.logAudit('PASSWORD_RESET_REQUEST', 'USER', `Solicitação de reset de senha para ${email}`, undefined, undefined, req.ip);
  res.json({ message: 'Se o e-mail estiver cadastrado, as instruções foram enviadas.' });
});

// ==========================================
// 2. PUBLIC ROUTES
// ==========================================
apiRouter.get('/public/settings', (_req: Request, res: Response) => {
  const state = db.getState();
  res.json({
    site: state.siteSettings,
    seo: state.seoSettings
  });
});

apiRouter.get('/public/pages/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const page = db.getState().pages.find((p) => p.slug === slug && p.status === 'PUBLISHED');
  if (!page) {
    res.status(404).json({ error: 'Página não encontrada ou não publicada.' });
    return;
  }
  res.json(page);
});

apiRouter.get('/public/posts', (_req: Request, res: Response) => {
  const posts = db.getState().posts.filter((p) => p.status === 'PUBLISHED');
  res.json(posts);
});

apiRouter.get('/public/posts/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const post = db.getState().posts.find((p) => p.slug === slug && p.status === 'PUBLISHED');
  if (!post) {
    res.status(404).json({ error: 'Post não encontrado ou não publicado.' });
    return;
  }
  res.json(post);
});

apiRouter.get('/public/projects', (_req: Request, res: Response) => {
  res.json(db.getState().projects);
});

apiRouter.get('/public/banners', (_req: Request, res: Response) => {
  const banners = db.getState().banners.filter((b) => b.active).sort((a, b) => a.position - b.position);
  res.json(banners);
});

// Public Appointment booking
apiRouter.post('/public/appointments', (req: Request, res: Response) => {
  const body = req.body as CreateAppointmentRequest;
  if (!body.name || !body.email || !body.phone || !body.date || !body.time) {
    res.status(400).json({ error: 'Campos obrigatórios: Nome, E-mail, Telefone, Data e Horário.' });
    return;
  }

  const newAppointment = {
    id: 'apt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    type: body.type || 'CLIENTE',
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company || '',
    reason: body.reason || 'Atendimento Geral',
    description: body.description || '',
    isExistingClient: !!body.isExistingClient,
    preferredChannel: body.preferredChannel || 'GOOGLE_MEET',
    date: body.date,
    time: body.time,
    status: 'SCHEDULED' as const,
    createdAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    appointments: [newAppointment, ...prev.appointments]
  }));

  db.logAudit('APPOINTMENT_CREATED', 'APPOINTMENT', `Novo agendamento recebido de ${body.name} (${body.email}) para ${body.date} às ${body.time}`, undefined, body.name, req.ip);
  db.logSystem('info', 'APPOINTMENTS', `Agendamento #${newAppointment.id} criado com sucesso.`);

  res.status(201).json(newAppointment);
});

// ==========================================
// 3. ADMIN CMS DASHBOARD & METRICS
// ==========================================
apiRouter.get('/dashboard', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getMetrics());
});

// ==========================================
// 4. PAGES MANAGEMENT
// ==========================================
apiRouter.get('/pages', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().pages);
});

apiRouter.get('/pages/:id', requireAuth, (req: Request, res: Response) => {
  const page = db.getState().pages.find((p) => p.id === req.params.id);
  if (!page) {
    res.status(404).json({ error: 'Página não encontrada' });
    return;
  }
  res.json(page);
});

apiRouter.post('/pages', requireAuth, (req: Request, res: Response) => {
  const { title, slug, content, excerpt, status, seoTitle, seoDescription, featuredImage } = req.body;
  if (!title || !slug) {
    res.status(400).json({ error: 'Título e slug são obrigatórios.' });
    return;
  }

  const newPage: PageDTO = {
    id: 'page_' + Date.now(),
    title,
    slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
    content: content || '',
    excerpt: excerpt || '',
    status: status || 'DRAFT',
    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt,
    featuredImage: featuredImage || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    pages: [newPage, ...prev.pages],
    pageRevisions: [
      { id: 'rev_' + Date.now(), pageId: newPage.id, content: newPage.content, createdAt: new Date().toISOString() },
      ...prev.pageRevisions
    ]
  }));

  db.logAudit('PAGE_CREATED', 'PAGE', `Página criada: "${newPage.title}" (${newPage.slug})`, (req as any).user.id, (req as any).user.name, req.ip);
  res.status(201).json(newPage);
});

apiRouter.put('/pages/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  let updatedPage: PageDTO | null = null;

  db.updateState((prev) => {
    const existing = prev.pages.find((p) => p.id === id);
    if (!existing) return prev;

    updatedPage = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return {
      ...prev,
      pages: prev.pages.map((p) => (p.id === id ? updatedPage! : p)),
      pageRevisions: [
        { id: 'rev_' + Date.now(), pageId: id, content: updatedPage!.content, createdAt: new Date().toISOString() },
        ...prev.pageRevisions
      ]
    };
  });

  if (!updatedPage) {
    res.status(404).json({ error: 'Página não encontrada' });
    return;
  }

  db.logAudit('PAGE_UPDATED', 'PAGE', `Página atualizada: "${(updatedPage as PageDTO).title}"`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json(updatedPage);
});

apiRouter.delete('/pages/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    pages: prev.pages.filter((p) => p.id !== id),
    pageRevisions: prev.pageRevisions.filter((r) => r.pageId !== id)
  }));
  db.logAudit('PAGE_DELETED', 'PAGE', `Página excluída ID #${id}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true });
});

// ==========================================
// 5. POSTS MANAGEMENT (BLOG)
// ==========================================
apiRouter.get('/posts', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().posts);
});

apiRouter.get('/posts/:id', requireAuth, (req: Request, res: Response) => {
  const post = db.getState().posts.find((p) => p.id === req.params.id);
  if (!post) {
    res.status(404).json({ error: 'Post não encontrado' });
    return;
  }
  res.json(post);
});

apiRouter.post('/posts', requireAuth, (req: Request, res: Response) => {
  const { title, slug, excerpt, content, category, tags, status, featuredImage } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Título é obrigatório.' });
    return;
  }

  const newPost: PostDTO = {
    id: 'post_' + Date.now(),
    title,
    slug: slug ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-') : title.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
    excerpt: excerpt || '',
    content: content || '',
    category: category || 'Geral',
    tags: Array.isArray(tags) ? tags : [],
    status: status || 'DRAFT',
    featuredImage: featuredImage || '',
    author: (req as any).user.name,
    readTimeMinutes: Math.max(1, Math.ceil((content || '').split(/\s+/).length / 200)),
    publishedAt: status === 'PUBLISHED' ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    posts: [newPost, ...prev.posts]
  }));

  db.logAudit('POST_CREATED', 'POST', `Post criado: "${newPost.title}"`, (req as any).user.id, (req as any).user.name, req.ip);
  res.status(201).json(newPost);
});

apiRouter.put('/posts/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  let updatedPost: PostDTO | null = null;

  db.updateState((prev) => {
    const existing = prev.posts.find((p) => p.id === id);
    if (!existing) return prev;

    updatedPost = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
      publishedAt: updates.status === 'PUBLISHED' && !existing.publishedAt ? new Date().toISOString() : existing.publishedAt
    };

    return {
      ...prev,
      posts: prev.posts.map((p) => (p.id === id ? updatedPost! : p))
    };
  });

  if (!updatedPost) {
    res.status(404).json({ error: 'Post não encontrado' });
    return;
  }

  db.logAudit('POST_UPDATED', 'POST', `Post atualizado: "${(updatedPost as PostDTO).title}"`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json(updatedPost);
});

apiRouter.delete('/posts/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    posts: prev.posts.filter((p) => p.id !== id)
  }));
  db.logAudit('POST_DELETED', 'POST', `Post removido ID #${id}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true });
});

// ==========================================
// 6. MEDIA LIBRARY
// ==========================================
apiRouter.get('/media', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().media);
});

apiRouter.post('/media', requireAuth, (req: Request, res: Response) => {
  const { name, url, type, sizeBytes, mimeType } = req.body;
  if (!name || !url) {
    res.status(400).json({ error: 'Nome e URL do arquivo são obrigatórios.' });
    return;
  }

  const newMedia: MediaDTO = {
    id: 'med_' + Date.now(),
    name,
    url,
    type: type || 'image',
    sizeBytes: sizeBytes || 102400,
    mimeType: mimeType || 'image/jpeg',
    createdAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    media: [newMedia, ...prev.media]
  }));

  db.logAudit('MEDIA_UPLOADED', 'MEDIA', `Arquivo de mídia adicionado: ${newMedia.name}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.status(201).json(newMedia);
});

apiRouter.delete('/media/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    media: prev.media.filter((m) => m.id !== id)
  }));
  db.logAudit('MEDIA_DELETED', 'MEDIA', `Arquivo de mídia removido ID #${id}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true });
});

// ==========================================
// 7. BANNERS
// ==========================================
apiRouter.get('/banners', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().banners);
});

apiRouter.post('/banners', requireAuth, (req: Request, res: Response) => {
  const { title, subtitle, imageUrl, buttonText, buttonUrl, position, active } = req.body;
  if (!title || !imageUrl) {
    res.status(400).json({ error: 'Título e imagem são obrigatórios.' });
    return;
  }

  const newBanner: BannerDTO = {
    id: 'ban_' + Date.now(),
    title,
    subtitle: subtitle || '',
    imageUrl,
    buttonText: buttonText || 'Saiba Mais',
    buttonUrl: buttonUrl || '#',
    position: position ?? db.getState().banners.length,
    active: active ?? true,
    createdAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    banners: [...prev.banners, newBanner]
  }));

  db.logAudit('BANNER_CREATED', 'BANNER', `Banner criado: ${newBanner.title}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.status(201).json(newBanner);
});

apiRouter.put('/banners/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  db.updateState((prev) => ({
    ...prev,
    banners: prev.banners.map((b) => (b.id === id ? { ...b, ...updates } : b))
  }));
  res.json({ success: true });
});

apiRouter.delete('/banners/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    banners: prev.banners.filter((b) => b.id !== id)
  }));
  res.json({ success: true });
});

// ==========================================
// 8. APPOINTMENTS MANAGEMENT
// ==========================================
apiRouter.get('/appointments', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().appointments);
});

apiRouter.get('/appointments/:id', requireAuth, (req: Request, res: Response) => {
  const apt = db.getState().appointments.find((a) => a.id === req.params.id);
  if (!apt) {
    res.status(404).json({ error: 'Agendamento não encontrado.' });
    return;
  }
  res.json(apt);
});

apiRouter.put('/appointments/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  let updated: any = null;

  db.updateState((prev) => {
    const existing = prev.appointments.find((a) => a.id === id);
    if (!existing) return prev;
    updated = { ...existing, ...updates };
    return {
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === id ? updated : a))
    };
  });

  if (!updated) {
    res.status(404).json({ error: 'Agendamento não encontrado.' });
    return;
  }

  db.logAudit('APPOINTMENT_STATUS_UPDATE', 'APPOINTMENT', `Agendamento #${id} atualizado para status: ${updates.status || updated.status}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json(updated);
});

// ==========================================
// 9. PROJECTS PORTFOLIO
// ==========================================
apiRouter.get('/projects', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().projects);
});

apiRouter.post('/projects', requireAuth, (req: Request, res: Response) => {
  const { name, slug, tagline, description, technologies, category, repositoryUrl, demoUrl, featured } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: 'Nome e descrição são obrigatórios.' });
    return;
  }

  const newProject: ProjectDTO = {
    id: 'proj_' + Date.now(),
    name,
    slug: slug ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-') : name.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
    tagline: tagline || '',
    description,
    technologies: Array.isArray(technologies) ? technologies : ['TypeScript'],
    category: category || 'AI',
    repositoryUrl: repositoryUrl || '',
    demoUrl: demoUrl || '',
    featured: featured ?? false,
    createdAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    projects: [newProject, ...prev.projects]
  }));

  db.logAudit('PROJECT_CREATED', 'PROJECT', `Projeto cadastrado: ${newProject.name}`, (req as any).user.id, (req as any).user.name, req.ip);
  res.status(201).json(newProject);
});

apiRouter.put('/projects/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  db.updateState((prev) => ({
    ...prev,
    projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
  }));
  res.json({ success: true });
});

apiRouter.delete('/projects/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    projects: prev.projects.filter((p) => p.id !== id)
  }));
  res.json({ success: true });
});

// ==========================================
// 10. REPOSITORIES & DEPLOYMENTS
// ==========================================
apiRouter.get('/repositories', requireAuth, (_req: Request, res: Response) => {
  const github = db.getState().integrations.find((i) => i.provider === 'github');
  if (!github?.connected) {
    res.json({ connected: false, repositories: [] });
    return;
  }
  res.json({
    connected: true,
    repositories: [
      { name: 'noteagents', fullName: 'deevo-solucoes/noteagents', branch: 'main', isPrivate: false, status: 'synced' },
      { name: 'deevo-web', fullName: 'deevo-solucoes/deevo-web', branch: 'main', isPrivate: false, status: 'synced' },
      { name: 'deevo-api', fullName: 'deevo-solucoes/deevo-api', branch: 'main', isPrivate: true, status: 'synced' }
    ]
  });
});

apiRouter.post('/repositories/sync', requireAuth, (req: Request, res: Response) => {
  const github = db.getState().integrations.find((i) => i.provider === 'github');
  if (!github?.connected) {
    res.status(400).json({ error: 'GitHub não está conectado. Configure a integração primeiro.' });
    return;
  }
  db.logAudit('GITHUB_SYNC', 'INTEGRATION', 'Sincronização manual com GitHub executada.', (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true, message: 'Repositórios sincronizados com sucesso.' });
});

apiRouter.get('/deployments', requireAuth, (_req: Request, res: Response) => {
  res.json([
    {
      id: 'dep_prod_1',
      environment: 'production',
      status: 'ready',
      branch: 'main',
      commitHash: '7f93a1c',
      commitMsg: 'feat: NoteAgents AI Engine and CMS integration',
      url: 'https://deevo.com.br',
      createdAt: new Date().toISOString()
    }
  ]);
});

apiRouter.post('/deployments/redeploy', requireAuth, (req: Request, res: Response) => {
  db.logAudit('DEPLOY_TRIGGERED', 'DEPLOYMENT', 'Novo build e deploy acionado manualmente.', (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true, message: 'Deploy acionado com sucesso na Vercel.' });
});

// ==========================================
// 11. INTEGRATIONS
// ==========================================
apiRouter.get('/integrations', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().integrations);
});

apiRouter.post('/integrations/:id/connect', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { config } = req.body;

  db.updateState((prev) => ({
    ...prev,
    integrations: prev.integrations.map((item) =>
      item.id === id ? { ...item, connected: true, config: config || {}, updatedAt: new Date().toISOString() } : item
    )
  }));

  db.logAudit('INTEGRATION_CONNECTED', 'INTEGRATION', `Integração #${id} conectada com sucesso.`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true });
});

apiRouter.post('/integrations/:id/disconnect', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  db.updateState((prev) => ({
    ...prev,
    integrations: prev.integrations.map((item) =>
      item.id === id ? { ...item, connected: false, config: {}, updatedAt: new Date().toISOString() } : item
    )
  }));

  db.logAudit('INTEGRATION_DISCONNECTED', 'INTEGRATION', `Integração #${id} desconectada.`, (req as any).user.id, (req as any).user.name, req.ip);
  res.json({ success: true });
});

// ==========================================
// 12. SEO & SITE SETTINGS
// ==========================================
apiRouter.get('/seo', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().seoSettings);
});

apiRouter.put('/seo', requireAuth, (req: Request, res: Response) => {
  const updates = req.body as Partial<SeoSettingsDTO>;
  db.updateState((prev) => ({
    ...prev,
    seoSettings: { ...prev.seoSettings, ...updates }
  }));
  db.logAudit('SEO_SETTINGS_UPDATED', 'SETTINGS', 'Metadados e configurações de SEO atualizados.', (req as any).user.id, (req as any).user.name, req.ip);
  res.json(db.getState().seoSettings);
});

apiRouter.get('/settings', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().siteSettings);
});

apiRouter.put('/settings', requireAuth, (req: Request, res: Response) => {
  const updates = req.body as Partial<SiteSettingsDTO>;
  db.updateState((prev) => ({
    ...prev,
    siteSettings: { ...prev.siteSettings, ...updates }
  }));
  db.logAudit('SITE_SETTINGS_UPDATED', 'SETTINGS', 'Configurações gerais do site atualizadas.', (req as any).user.id, (req as any).user.name, req.ip);
  res.json(db.getState().siteSettings);
});

// ==========================================
// 13. USERS MANAGEMENT
// ==========================================
apiRouter.get('/users', requireAuth, (_req: Request, res: Response) => {
  const users = db.getState().users.map(({ passwordHash: _, ...safe }) => safe);
  res.json(users);
});

apiRouter.post('/users', requireAuth, (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    return;
  }

  const existing = db.getState().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.status(409).json({ error: 'Já existe um usuário cadastrado com este e-mail.' });
    return;
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email: email.toLowerCase().trim(),
    role: role || 'EDITOR',
    avatarUrl: '/icon.svg',
    passwordHash: crypto.createHash('sha256').update(password).digest('hex'),
    createdAt: new Date().toISOString()
  };

  db.updateState((prev) => ({
    ...prev,
    users: [...prev.users, newUser]
  }));

  db.logAudit('USER_CREATED', 'USER', `Novo usuário cadastrado: ${newUser.name} (${newUser.email}) com cargo ${newUser.role}`, (req as any).user.id, (req as any).user.name, req.ip);
  const { passwordHash: _, ...safe } = newUser;
  res.status(201).json(safe);
});

// ==========================================
// 14. AUDIT & LOGS
// ==========================================
apiRouter.get('/audit', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().auditLogs);
});

apiRouter.get('/logs', requireAuth, (_req: Request, res: Response) => {
  res.json(db.getState().systemLogs);
});
