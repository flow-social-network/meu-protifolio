import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';
import { DeevoLogo } from '../../../components/shared/DeevoLogo/DeevoLogo';
import { FounderAvatar } from '../../../components/shared/FounderAvatar/FounderAvatar';

interface LoginProps {
  onNavigate: (path: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const toast = useToast();

  usePageSEO({
    title: 'Acesso Restrito — Painel DEEVO & NoteAgents',
    description: 'Área restrita de administração do sistema NoteAgents e DEEVO CMS.',
    isPrivate: true
  });

  const [email, setEmail] = useState('contato@deevofinanceiras.com.br');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha seu e-mail e senha.');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success('Login efetuado com sucesso! Redirecionando...');
      onNavigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Falha ao autenticar. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Form Column (Col 7) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-8">
              <DeevoLogo variant="horizontal" size="md" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Acesse seu painel</h1>
            <p className="text-xs text-slate-500 mt-1 mb-8">
              Gerencie seu site, conteúdos, integrações e atendimentos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">E-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Senha</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Lembrar de mim
                </label>

                <button
                  type="button"
                  onClick={() => onNavigate('/auth/reset-password')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Esqueci minha senha
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Autenticando...' : 'Entrar no Painel'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-blue-700 block">Credenciais de Administrador:</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[10px]">
                  <span>E-mail: <strong>contato@deevofinanceiras.com.br</strong></span>
                  <span>Senha: <strong>admin123</strong></span>
                </div>
              </div>
            </form>
          </div>

          <div className="pt-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Acesso restrito e seguro</span>
          </div>
        </div>

        {/* Right Promotional Column (Col 5) matching Image 6 Screen 01 */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-200 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs">
              NoteAgents Control Plane
            </span>
          </div>

          <div className="relative z-10 text-center my-8 flex flex-col items-center">
            <div className="mb-4">
              <FounderAvatar size="lg" />
            </div>
            <p className="text-sm italic font-medium text-blue-100 max-w-xs mx-auto leading-relaxed">
              “Tecnologia para transformar ideias em resultados reais.”
            </p>
            <span className="block mt-2 text-xs font-bold text-white">— Vini Amaral</span>
            <span className="text-[10px] text-blue-200">DEEVO Soluções Financeiras</span>
          </div>

          <div className="relative z-10 text-[11px] text-blue-200 text-center">
            Sistema CMS e Gerenciador de Agentes v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};
