import { trackFirebaseError, FirebaseService, type FirebaseServiceType } from './analytics';
import { FirebaseError } from 'firebase/app';

const sendErrorToGA4 = (
  error: unknown,
  service: FirebaseServiceType,
  operation: string
) => {
  if (error instanceof FirebaseError) {
    trackFirebaseError(service, error.code || 'unknown', `[${operation}] ${error.message}`);
  } else if (error instanceof Error) {
    trackFirebaseError(service, 'unknown', `[${operation}] ${error.message}`);
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
