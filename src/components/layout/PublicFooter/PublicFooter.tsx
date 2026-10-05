import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { DeevoLogo } from '../../shared/DeevoLogo/DeevoLogo';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="mb-4">
              <DeevoLogo variant="white" size="md" showSlogan={true} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Transformando ideias em soluções digitais reais. Desenvolvimento de software moderno,
              inteligência artificial, arquitetura escalável e sistemas financeiros de alto impacto.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com/deevo-solucoes"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/viniamaral"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@deevofinanceiras.com.br"
                aria-label="E-mail"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions & Platforms */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Soluções & Plataformas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/projetos')}
                  className="hover:text-white transition flex items-center gap-1 group"
                >
                  NoteAgents (AI Control Plane)
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solucoes')} className="hover:text-white transition">
                  Sistemas Financeiros & Crédito
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solucoes')} className="hover:text-white transition">
                  Automação com Agentes de IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projetos')} className="hover:text-white transition">
                  Auditoria de Código & Qualidade
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/recursos')} className="hover:text-white transition">
                  Integrações & APIs REST
                </button>
              </li>
            </ul>
          </div>

          {/* Open Source & Docs */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Comunidade & Docs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/open-source')} className="hover:text-white transition">
                  NoteAgents Open Source
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/comunidade')} className="hover:text-white transition">
                  Comunidade de Desenvolvedores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/documentacao')} className="hover:text-white transition">
                  Documentação Técnica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/desenvolvedores')} className="hover:text-white transition">
                  Portal do Desenvolvedor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/media-kit')} className="hover:text-white transition font-semibold text-blue-400">
                  Media Kit & Marca
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-white transition">
                  Blog & Artigos Técnicos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Atendimento & Contato
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Brasil — Atendimento Nacional</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:contato@deevofinanceiras.com.br" className="hover:text-white transition">
                  contato@deevofinanceiras.com.br
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+555137866302" className="hover:text-white transition">
                  (51) 3786-6302
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => onNavigate('/atendimento')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm text-center"
              >
                Agendar Reunião Online
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 DEEVO Soluções Financeiras LTDA — CNPJ: 63.187.175/0001-70. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/privacidade')} className="hover:text-slate-300 transition">
              Política de Privacidade
            </button>
            <button onClick={() => onNavigate('/termos')} className="hover:text-slate-300 transition">
              Termos de Uso
            </button>
            <button onClick={() => onNavigate('/cookies')} className="hover:text-slate-300 transition">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
