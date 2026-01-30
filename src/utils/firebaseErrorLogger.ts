import { trackFirebaseError, FirebaseService, type FirebaseServiceType } from './analytics';
import { sanitizeErrorText } from './sanitizeErrorMessage';
import { FirebaseError } from 'firebase/app';

const sendErrorToGA4 = (
  error: unknown,
  service: FirebaseServiceType,
  operation: string
) => {
  if (error instanceof FirebaseError) {
    const sanitizedMessage = sanitizeErrorText(error.message, 200);
    const code = error.code || 'unknown';
    trackFirebaseError(service, code, `[${operation}] ${sanitizedMessage}`);
  } else if (error instanceof Error) {
    const sanitizedMessage = sanitizeErrorText(error.message, 200);
    trackFirebaseError(service, 'unknown', `[${operation}] ${sanitizedMessage}`);
  } else {
    trackFirebaseError(service, 'unknown', `[${operation}] Unknown error`);
  }
};

export const withAuthErrorLogging = async <T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    sendErrorToGA4(error, FirebaseService.AUTH, operation);
    throw error;
  }
};

export const withFirestoreErrorLogging = async <T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    sendErrorToGA4(error, FirebaseService.FIRESTORE, operation);
    throw error;
  }
};
