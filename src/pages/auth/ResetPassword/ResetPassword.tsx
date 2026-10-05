import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck, Clock, Lock } from 'lucide-react';
import { api } from '../../../services/api';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';

interface ResetPasswordProps {
  onNavigate: (path: string) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onNavigate }) => {
  const toast = useToast();

  usePageSEO({
    title: 'Recuperar Senha — DEEVO & NoteAgents',
    description: 'Instruções para redefinição de senha segura do painel administrativo.',
    isPrivate: true
  });

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Informe seu e-mail cadastrado.');
      return;
    }

    setLoading(true);
    try {
      await api.auth.resetPassword(email);
      setSent(true);
      toast.success('Instruções enviadas com sucesso!');
    } catch (err: any) {
      toast.error(err.message || 'Falha ao processar solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Form Column (Col 7) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5 shadow-sm">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#FFFFFF" opacity="0.9" />
                  <path d="M50 16 L80 34 L50 52 L20 34 Z" fill="#0B5FFF" />
                  <path d="M20 38 L50 56 L50 84 L20 66 Z" fill="#043299" />
                  <path d="M80 38 L80 66 L50 84 L50 56 Z" fill="#00A3FF" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">DEEVO</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Recuperar sua senha</h1>
            <p className="text-xs text-slate-500 mt-1 mb-8">
              Informe seu e-mail para receber as instruções de redefinição de senha.
            </p>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h2 className="text-sm font-bold text-emerald-900">E-mail enviado!</h2>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Se o endereço <strong>{email}</strong> estiver cadastrado no sistema, você receberá um link seguro para criar uma nova senha.
                </p>
                <button
                  onClick={() => onNavigate('/auth/login')}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-emerald-700 font-semibold text-xs border border-emerald-300 hover:bg-emerald-100 transition"
                >
                  Voltar para o Login
                </button>
              </div>
            ) : (
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? 'Enviando...' : 'Enviar instruções'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('/auth/login')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Voltar para o login
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pt-8 text-xs text-slate-400 text-center sm:text-left">
            Ambiente seguro com criptografia de ponta a ponta.
          </div>
        </div>

        {/* Right Info Column (Col 5) matching Image 6 Screen 02 */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-700 to-indigo-900 p-8 sm:p-12 text-white flex flex-col justify-between">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-blue-200" />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">Você receberá um e-mail com o link para redefinir sua senha de forma segura.</h2>

            <div className="space-y-3 pt-4 text-xs text-blue-100">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Link com assinatura criptográfica única</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Válido por tempo limitado (15 minutos)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Acesso monitorado e protegido por logs</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-blue-300">
            NoteAgents Security Center
          </div>
        </div>
      </div>
    </div>
  );
};
