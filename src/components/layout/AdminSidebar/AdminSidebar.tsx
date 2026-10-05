import React from 'react';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Sliders,
  Calendar,
  FolderGit2,
  GitBranch,
  Rocket,
  Plug,
  Search,
  Settings,
  Users,
  ShieldCheck,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPath,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile
}) => {
  const { user, logout } = useAuth();

  const handleNav = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  const navGroups = [
    {
      title: 'Conteúdo',
      items: [
        { label: 'Painel', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Páginas', path: '/admin/pages', icon: FileText },
        { label: 'Posts (Blog)', path: '/admin/posts', icon: BookOpen },
        { label: 'Mídia (Imagens)', path: '/admin/media', icon: ImageIcon },
        { label: 'Banners', path: '/admin/banners', icon: Sliders },
        { label: 'Agendamentos', path: '/admin/appointments', icon: Calendar }
      ]
    },
    {
      title: 'Projetos',
      items: [
        { label: 'Projetos', path: '/admin/projects', icon: FolderGit2 },
        { label: 'Repositórios', path: '/admin/repositories', icon: GitBranch },
        { label: 'Deploy & Publicação', path: '/admin/deployments', icon: Rocket }
      ]
    },
    {
      title: 'Configurações',
      items: [
        { label: 'Integrações', path: '/admin/integrations', icon: Plug },
        { label: 'SEO e Metadados', path: '/admin/seo', icon: Search },
        { label: 'Configurações', path: '/admin/settings', icon: Settings },
        { label: 'Usuários & Cargos', path: '/admin/users', icon: Users },
        { label: 'Auditoria', path: '/admin/audit', icon: ShieldCheck },
        { label: 'Logs do Sistema', path: '/admin/logs', icon: Activity }
      ]
    }
  ];

  return (
    <aside
      className={`h-full bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#FFFFFF" opacity="0.9" />
              <path d="M50 16 L80 34 L50 52 L20 34 Z" fill="#0B5FFF" />
              <path d="M20 38 L50 56 L50 84 L20 66 Z" fill="#043299" />
              <path d="M80 38 L80 66 L50 84 L50 56 Z" fill="#00A3FF" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <span className="font-extrabold text-base tracking-tight text-white block">DEEVO</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block -mt-1">
                Painel CMS
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <h4 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    title={isCollapsed ? item.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/60">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrador'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@deevo.com.br'}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            logout();
            onNavigate('/auth/login');
          }}
          title="Encerrar Sessão"
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Sair da Conta</span>}
        </button>
      </div>
    </aside>
  );
};
