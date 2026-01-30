import ReactGA from 'react-ga4';
import { firebaseConfig } from '../configs/firebaseConfig';

export const FirebaseService = {
  AUTH: 'auth',
  FIRESTORE: 'firestore',
  OTHER: 'other',
} as const;

export type FirebaseServiceType = typeof FirebaseService[keyof typeof FirebaseService];

export const initializeGA4 = () => {
  if (!firebaseConfig.measurementId) return;

  ReactGA.initialize(firebaseConfig.measurementId, {
    gaOptions: {
      send_page_view: false,
    },
  });
};

export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  ReactGA.event(eventName, params);
};

export const setUserId = (userId: string | null) => {
  ReactGA.set({ userId: userId ?? undefined });
};

export const trackGameScore = (score: number) => {
  trackEvent('game_score', {
    score,
    timestamp: new Date().toISOString(),
  });
};

export const trackGameDuration = (duration: number) => {
  trackEvent('game_duration', {
    duration_seconds: duration,
    duration_minutes: Math.round(duration / 60 * 100) / 100,
  });
};

export const trackFirebaseError = (
  service: FirebaseServiceType,
  errorCode: string,
  errorMessage: string
) => {
  trackEvent('firebase_error', {
    service,
    error_code: errorCode,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

export const trackError = (
  errorName: string,
  errorMessage: string,
  errorStack?: string
) => {
  trackEvent('app_error', {
    error_name: errorName,
    error_message: errorMessage,
    error_stack: errorStack?.substring(0, 500),
    timestamp: new Date().toISOString(),
  });
};
