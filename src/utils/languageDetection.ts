export const supportedLanguages = ['ko', 'en', 'de', 'ru', 'es', 'pt', 'it', 'fr', 'zh-CN', 'zh-TW', 'ja'] as const;

export type SupportedLanguage = typeof supportedLanguages[number];

export const detectBrowserLanguage = (): SupportedLanguage => {
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    const lang = browserLang.toLowerCase();
    
    if (supportedLanguages.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
    
    const langCode = lang.split('-')[0];
    
    if (langCode === 'zh') {
      // zh-CN, zh-Hans -> zh-CN
      if (lang.includes('cn') || lang.includes('hans')) {
        return 'zh-CN';
      }
      // zh-TW, zh-HK, zh-Hant -> zh-TW
      if (lang.includes('tw') || lang.includes('hk') || lang.includes('hant')) {
        return 'zh-TW';
      }
      return 'zh-CN';
    }
    
    const matchedLang = supportedLanguages.find(supported => supported.startsWith(langCode));
    if (matchedLang) {
      return matchedLang;
    }
  }
  
  return 'en';
};
