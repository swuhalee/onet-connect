import { trackFirebaseError, FirebaseService, type FirebaseServiceType } from './analytics';
import { sanitizeErrorMessage } from './sanitizeErrorMessage';
import { FirebaseError } from 'firebase/app';

const sendErrorToGA4 = (
  error: unknown,
  service: FirebaseServiceType,
  operation: string
) => {
  if (error instanceof FirebaseError) {
    const sanitizedMessage = sanitizeErrorMessage(error.message);
    const code = error.code || 'unknown';
    trackFirebaseError(service, code, `[${operation}] ${sanitizedMessage}`);
  } else if (error instanceof Error) {
    const sanitizedMessage = sanitizeErrorMessage(error.message);
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
