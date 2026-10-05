import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { PublicHeader } from './components/layout/PublicHeader/PublicHeader';
import { PublicFooter } from './components/layout/PublicFooter/PublicFooter';
import { AdminLayout } from './components/layout/AdminLayout/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home/Home';
import { About } from './pages/public/About/About';
import { Projects } from './pages/public/Projects/Projects';
import { Solutions } from './pages/public/Solutions/Solutions';
import { Resources } from './pages/public/Resources/Resources';
import { Blog } from './pages/public/Blog/Blog';
import { Contact } from './pages/public/Contact/Contact';
import { Appointments } from './pages/public/Appointments/Appointments';
import { OpenSource } from './pages/public/OpenSource/OpenSource';
import { Community } from './pages/public/Community/Community';
import { Documentation } from './pages/public/Documentation/Documentation';
import { Developers } from './pages/public/Developers/Developers';
import { LegalPage } from './pages/public/Legal/LegalPage';
import { NotFound } from './pages/public/NotFound/NotFound';

// Auth Pages
import { Login } from './pages/auth/Login/Login';
import { ResetPassword } from './pages/auth/ResetPassword/ResetPassword';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard/AdminDashboard';
import { AdminPages } from './pages/admin/AdminPages/AdminPages';
import { AdminPosts } from './pages/admin/AdminPosts/AdminPosts';
import { AdminMedia } from './pages/admin/AdminMedia/AdminMedia';
import { AdminBanners } from './pages/admin/AdminBanners/AdminBanners';
import { AdminAppointments } from './pages/admin/AdminAppointments/AdminAppointments';
import { AdminProjects } from './pages/admin/AdminProjects/AdminProjects';
import { AdminRepositories } from './pages/admin/AdminRepositories/AdminRepositories';
import { AdminDeployments } from './pages/admin/AdminDeployments/AdminDeployments';
import { AdminIntegrations } from './pages/admin/AdminIntegrations/AdminIntegrations';
import { AdminSEO } from './pages/admin/AdminSEO/AdminSEO';
import { AdminSettings } from './pages/admin/AdminSettings/AdminSettings';
import { AdminUsers } from './pages/admin/AdminUsers/AdminUsers';
import { AdminAudit } from './pages/admin/AdminAudit/AdminAudit';
import { AdminLogs } from './pages/admin/AdminLogs/AdminLogs';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Auth pages route matching
  if (currentPath === '/auth/login') {
    return <Login onNavigate={navigate} />;
  }

  if (currentPath === '/auth/reset-password') {
    return <ResetPassword onNavigate={navigate} />;
  }

  // Admin Area: If user tries to access /admin/* and is not authenticated, redirect to /auth/login
  if (currentPath.startsWith('/admin') || currentPath === '/dashboard') {
    if (!isAuthenticated) {
      return <Login onNavigate={navigate} />;
    }

    let adminTitle = 'Painel do Site';
    let adminComponent: React.ReactNode = <AdminDashboard onNavigate={navigate} />;

    if (currentPath === '/admin/pages') {
      adminTitle = 'Páginas';
      adminComponent = <AdminPages />;
    } else if (currentPath === '/admin/posts') {
      adminTitle = 'Posts do Blog';
      adminComponent = <AdminPosts />;
    } else if (currentPath === '/admin/media') {
      adminTitle = 'Biblioteca de Mídia';
      adminComponent = <AdminMedia />;
    } else if (currentPath === '/admin/banners') {
      adminTitle = 'Banners da Home';
      adminComponent = <AdminBanners />;
    } else if (currentPath === '/admin/appointments') {
      adminTitle = 'Agendamentos';
      adminComponent = <AdminAppointments />;
    } else if (currentPath === '/admin/projects') {
      adminTitle = 'Projetos';
      adminComponent = <AdminProjects />;
    } else if (currentPath === '/admin/repositories') {
      adminTitle = 'Repositórios';
      adminComponent = <AdminRepositories />;
    } else if (currentPath === '/admin/deployments') {
      adminTitle = 'Deploy & Publicação';
      adminComponent = <AdminDeployments />;
    } else if (currentPath === '/admin/integrations') {
      adminTitle = 'Integrações';
      adminComponent = <AdminIntegrations />;
    } else if (currentPath === '/admin/seo') {
      adminTitle = 'SEO e Metadados';
      adminComponent = <AdminSEO />;
    } else if (currentPath === '/admin/settings') {
      adminTitle = 'Configurações do Site';
      adminComponent = <AdminSettings />;
    } else if (currentPath === '/admin/users') {
      adminTitle = 'Usuários e Permissões';
      adminComponent = <AdminUsers />;
    } else if (currentPath === '/admin/audit') {
      adminTitle = 'Auditoria do Sistema';
      adminComponent = <AdminAudit />;
    } else if (currentPath === '/admin/logs') {
      adminTitle = 'Logs do Sistema';
      adminComponent = <AdminLogs />;
    }

    return (
      <AdminLayout currentPath={currentPath} onNavigate={navigate} title={adminTitle}>
        {adminComponent}
      </AdminLayout>
    );
  }

  // Public Site Area (with PublicHeader and PublicFooter)
  let publicPageContent: React.ReactNode = null;

  if (currentPath === '/') {
    publicPageContent = <Home onNavigate={navigate} />;
  } else if (currentPath === '/sobre') {
    publicPageContent = <About onNavigate={navigate} />;
  } else if (currentPath === '/projetos') {
    publicPageContent = <Projects onNavigate={navigate} />;
  } else if (currentPath.startsWith('/projetos/')) {
    const slug = currentPath.replace('/projetos/', '');
    publicPageContent = <Projects onNavigate={navigate} selectedSlug={slug} />;
  } else if (currentPath === '/solucoes') {
    publicPageContent = <Solutions onNavigate={navigate} />;
  } else if (currentPath === '/recursos') {
    publicPageContent = <Resources onNavigate={navigate} />;
  } else if (currentPath === '/blog') {
    publicPageContent = <Blog onNavigate={navigate} />;
  } else if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '');
    publicPageContent = <Blog onNavigate={navigate} selectedSlug={slug} />;
  } else if (currentPath === '/contato') {
    publicPageContent = <Contact onNavigate={navigate} />;
  } else if (currentPath === '/atendimento') {
    publicPageContent = <Appointments onNavigate={navigate} />;
  } else if (currentPath === '/open-source') {
    publicPageContent = <OpenSource onNavigate={navigate} />;
  } else if (currentPath === '/comunidade') {
    publicPageContent = <Community onNavigate={navigate} />;
  } else if (currentPath === '/documentacao') {
    publicPageContent = <Documentation onNavigate={navigate} />;
  } else if (currentPath === '/desenvolvedores') {
    publicPageContent = <Developers onNavigate={navigate} />;
  } else if (currentPath === '/privacidade') {
    publicPageContent = <LegalPage type="privacy" onNavigate={navigate} />;
  } else if (currentPath === '/termos') {
    publicPageContent = <LegalPage type="terms" onNavigate={navigate} />;
  } else if (currentPath === '/cookies') {
    publicPageContent = <LegalPage type="cookies" onNavigate={navigate} />;
  } else {
    publicPageContent = <NotFound onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <PublicHeader currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">{publicPageContent}</main>
      <PublicFooter onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </SiteProvider>
    </AuthProvider>
  );
}
