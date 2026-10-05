import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Download, Calendar } from 'lucide-react';
import { DeevoLogo } from '../../shared/DeevoLogo/DeevoLogo';
import { PWAInstallButton } from '../../shared/PWAInstallButton/PWAInstallButton';

interface PublicHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Projetos', path: '/projetos' },
    { label: 'Recursos', path: '/recursos' },
    { label: 'Soluções', path: '/solucoes' },
    { label: 'Blog', path: '/blog' },
    { label: 'Media Kit', path: '/media-kit' },
    { label: 'Contato', path: '/contato' },
    { label: 'Atendimento', path: '/atendimento' }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with exact 3D faceted D */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center group text-left focus-visible:outline-none"
          aria-label="DEEVO Soluções Financeiras - Página inicial"
        >
          <DeevoLogo variant="horizontal" size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <PWAInstallButton />

          <button
            onClick={() => handleNavClick('/sobre')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar Currículo
          </button>

          <button
            onClick={() => handleNavClick('/atendimento')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition"
          >
            <Calendar className="w-3.5 h-3.5" />
            Agendar Atendimento
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-6 shadow-xl animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-1.5" aria-label="Navegação mobile">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('/atendimento')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Agendar Atendimento
            </button>
            <button
              onClick={() => handleNavClick('/sobre')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm"
            >
              <Download className="w-4 h-4" />
              Baixar Currículo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
