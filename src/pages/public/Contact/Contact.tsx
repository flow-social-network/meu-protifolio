import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import { usePageSEO } from '../../../context/SiteContext';
import { useToast } from '../../../context/ToastContext';

interface ContactProps {
  onNavigate: (path: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const toast = useToast();

  usePageSEO({
    title: 'Contato — DEEVO & NoteAgents',
    description: 'Entre em contato conosco para novos projetos, consultoria ou dúvidas.',
    canonicalPath: '/contato'
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Preencha os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Canais de Atendimento
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
          Vamos conversar?
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Estou sempre aberto a novos projetos, desafios de engenharia e parcerias inovadoras.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">WhatsApp</span>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-blue-600 transition"
              >
                +55 (11) 99999-9999
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">E-mail</span>
              <a
                href="mailto:vini@deevo.com.br"
                className="text-sm font-bold text-slate-900 hover:text-blue-600 transition"
              >
                vini@deevo.com.br
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Localização</span>
              <span className="text-sm font-bold text-slate-900">Brasil (Atendimento Remoto)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">LinkedIn</span>
              <a
                href="https://linkedin.com/in/viniamaral"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-blue-600 transition truncate block max-w-xs"
              >
                linkedin.com/in/viniamaral
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">GitHub</span>
              <a
                href="https://github.com/deevo-solucoes"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-blue-600 transition truncate block max-w-xs"
              >
                github.com/deevo-solucoes
              </a>
            </div>
          </div>
        </div>

        {/* Message Form (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          {sent ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Mensagem Enviada!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Obrigado pelo contato. Retornarei o mais breve possível para conversarmos.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Envie uma mensagem</h3>
              <p className="text-xs text-slate-500 mb-4">
                Preencha o formulário abaixo e receba um retorno em até 24 horas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assunto</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Sobre o que deseja conversar?"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mensagem *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Descreva seu projeto ou ideia..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
