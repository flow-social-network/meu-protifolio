import React, { useState } from 'react';
import { Menu, Search, ExternalLink, Bell, User, LogOut, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  onNavigate: (path: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenMobileSidebar, onNavigate }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left items: Mobile toggle + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Abrir menu lateral"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar no painel..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ver Site Button */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
        >
          <span>Ver Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notificações</span>
                <span className="text-[10px] text-blue-600 font-semibold">Tudo lido</span>
              </div>
              <div className="py-3 text-xs text-slate-600 space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Sistema operacional</p>
                    <p className="text-[11px] text-slate-500">NoteAgents API conectada e pronta para produção.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user?.name ? user.name[0] : 'V'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || 'Vini Amaral'}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{user?.role || 'Administrador'}</p>
            </div>
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100 text-xs text-slate-500">
                Logado como <strong className="text-slate-900">{user?.email || 'vini@deevo.com.br'}</strong>
              </div>
              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  onNavigate('/admin/settings');
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Configurações
              </button>
              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  logout();
                  onNavigate('/auth/login');
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
