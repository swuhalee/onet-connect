import type { LanguageInfo } from '../models/language';

export const languages: readonly LanguageInfo[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Portugues', flag: '🇵🇹' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', label: '正體中文', flag: '🇹🇼' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
] as const;

// languages 배열에서 언어 코드만 추출
export const supportedLanguages = languages.map(lang => lang.code) as readonly string[];
export type SupportedLanguage = LanguageInfo['code'];

/**
 * 유효한 언어 코드인지 확인
 * @param code 확인할 언어 코드
 * @returns 유효한 언어 코드인지 여부
 */
export const isValidLanguage = (code: string | undefined): boolean => {
  if (!code) return false;
  return supportedLanguages.includes(code as SupportedLanguage);
};

/**
 * 현재 언어 코드를 가져오고, URL 파라미터가 유효하지 않으면 i18n의 현재 언어나 기본값을 사용함
 * @param lng URL에서 가져온 언어 코드
 * @param i18nLanguage i18n의 현재 언어 코드
 * @param defaultLanguage 기본 언어 코드 (기본값: 'en')
 * @returns 유효한 언어 코드
 */
export const getCurrentLanguage = (
  lng: string | undefined,
  i18nLanguage: string | undefined = undefined,
  defaultLanguage: SupportedLanguage = 'en'
): SupportedLanguage => {
  if (lng && isValidLanguage(lng)) {
    return lng as SupportedLanguage;
  }
  if (i18nLanguage && isValidLanguage(i18nLanguage)) {
    return i18nLanguage as SupportedLanguage;
  }
  return defaultLanguage;
};

/**
 * 언어 코드를 로케일 코드로 변환함
 * @param language 언어 코드
 * @returns 로케일 코드
 */
export const getLocaleFromLanguage = (language: string): string => {
  const localeMap: Record<string, string> = {
    'ko': 'ko-KR',
    'en': 'en-US',
    'de': 'de-DE',
    'ru': 'ru-RU',                                                                         
    'es': 'es-ES',
    'pt': 'pt-PT',
    'it': 'it-IT',
    'fr': 'fr-FR',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja-JP',
  };
  return localeMap[language] || 'en-US';
};

export const detectBrowserLanguage = (): SupportedLanguage => {
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    const lang = browserLang.toLowerCase();
    
    const exactMatch = supportedLanguages.find(s => s.toLowerCase() === lang);
    if (exactMatch) {
      return exactMatch;
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
