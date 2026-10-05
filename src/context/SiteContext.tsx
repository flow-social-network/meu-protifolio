import React, { createContext, useContext, useState, useEffect } from 'react';
import { SeoSettingsDTO, SiteSettingsDTO } from '../../contracts';
import { api } from '../services/api';

interface SiteContextType {
  site: SiteSettingsDTO | null;
  seo: SeoSettingsDTO | null;
  refreshSettings: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [site, setSite] = useState<SiteSettingsDTO | null>(null);
  const [seo, setSeo] = useState<SeoSettingsDTO | null>(null);

  const fetchSettings = async () => {
    try {
      const data = await api.public.getSettings();
      setSite(data.site);
      setSeo(data.seo);
    } catch {
      // Offline fallback
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        site,
        seo,
        refreshSettings: fetchSettings
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite deve ser utilizado dentro de um SiteProvider');
  }
  return context;
};

// Hook for dynamic page SEO & Accessibility
export function usePageSEO(params: {
  title: string;
  description?: string;
  canonicalPath?: string;
  isPrivate?: boolean;
}) {
  useEffect(() => {
    const fullTitle = params.title.includes('NoteAgents')
      ? params.title
      : `${params.title} — NoteAgents`;
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (params.description) {
      metaDesc.setAttribute('content', params.description);
    }

    // OG Title & Desc
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && params.description) ogDesc.setAttribute('content', params.description);

    // Robots meta tag: strictly enforce NOINDEX, NOFOLLOW for private admin/auth areas!
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    if (params.isPrivate) {
      robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive');
    } else {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (params.canonicalPath && !params.isPrivate) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      const baseUrl = window.location.origin;
      canonical.setAttribute('href', `${baseUrl}${params.canonicalPath}`);
    } else if (canonical && params.isPrivate) {
      canonical.remove();
    }
  }, [params.title, params.description, params.canonicalPath, params.isPrivate]);
}
