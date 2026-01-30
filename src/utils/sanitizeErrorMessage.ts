const MAX_SANITIZED_MESSAGE_LENGTH = 200;

/**
 * 에러 메시지를 안전하게 로깅(예: 분석)하기 위해 정제한다.
 * 이메일, 전화번호, 토큰/긴 hex·base64 문자열, 흔한 UID 패턴을 제거한 뒤
 * 안전한 길이로 잘라낸다.
 */
export const sanitizeErrorMessage = (message: string): string => {
  let out = message;
  // Email addresses
  out = out.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email redacted]');
  // Phone numbers (international, with spaces/dashes/dots/parens)
  out = out.replace(/\+?[\d\s\-().]{10,}/g, '[phone redacted]');
  // Long hex strings (e.g. tokens, hashes) – 24+ hex chars
  out = out.replace(/\b[a-fA-F0-9]{24,}\b/g, '[hex redacted]');
  // Base64-like strings (alphanumeric + / + =, length 20+)
  out = out.replace(/\b[A-Za-z0-9+/]{20,}={0,2}\b/g, '[token redacted]');
  // Common UID patterns: Firebase 28-char UID, UUID-style
  out = out.replace(/\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\b/g, '[uid redacted]');
  out = out.replace(/\b[a-zA-Z0-9]{28}\b/g, '[uid redacted]');
  return out.slice(0, MAX_SANITIZED_MESSAGE_LENGTH);
};
