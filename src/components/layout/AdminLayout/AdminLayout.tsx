import React, { useState } from 'react';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import { usePageSEO } from '../../../context/SiteContext';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  title: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  title,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Private route SEO: enforce NOINDEX, NOFOLLOW automatically
  usePageSEO({
    title: `${title} | Painel DEEVO & NoteAgents`,
    isPrivate: true
  });

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Desktop / Tablet Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <AdminSidebar
          currentPath={currentPath}
          onNavigate={onNavigate}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left">
            <AdminSidebar
              currentPath={currentPath}
              onNavigate={onNavigate}
              isCollapsed={false}
              onToggleCollapse={() => {}}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Fechar menu lateral"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <AdminHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onNavigate={onNavigate}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Admin Mini Footer */}
        <footer className="h-10 px-6 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>NoteAgents CMS v1.0.0 — Ambiente Autenticado</span>
          <span>Privacidade & Segurança Ativas</span>
        </footer>
      </div>
    </div>
  );
};
