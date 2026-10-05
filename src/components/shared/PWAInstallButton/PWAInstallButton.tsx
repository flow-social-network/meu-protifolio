import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        onClick={install}
        aria-label="Instalar aplicativo NoteAgents"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
      >
        <Download className="w-3.5 h-3.5" />
        Instalar App
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          aria-label="Como instalar no iOS"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
          Instalar App
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 id="ios-title" className="text-base font-bold text-slate-900">
                Instalar no iPhone ou iPad
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left bg-slate-50 p-3 rounded-xl border border-slate-200">
                1. Toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta para cima) na barra do Safari.<br /><br />
                2. Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.<br /><br />
                3. Toque em <strong>Adicionar</strong> no canto superior direito.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
