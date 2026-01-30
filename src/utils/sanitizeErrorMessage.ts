const DEFAULT_MAX_LENGTH = 500;

/**
 * 에러 메시지/스택을 GA4 등으로 보내기 전 PII를 제거한다.
 * 이메일, 전화번호, URL, IP, 토큰/hex/base64/UID 패턴을 치환하고,
 * 공백을 정규화한 뒤 maxLength까지 잘라낸다.
 */
export const sanitizeErrorText = (
  text: string,
  maxLength: number = DEFAULT_MAX_LENGTH
): string => {
  let out = text;
  // Email addresses
  out = out.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email redacted]');
  // Phone numbers (international, with spaces/dashes/dots/parens)
  out = out.replace(/\+?[\d\s\-().]{10,}/g, '[phone redacted]');
  // URLs (http/https, optional www)
  out = out.replace(/https?:\/\/[^\s]+/gi, '[url redacted]');
  out = out.replace(/\bwww\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g, '[url redacted]');
  // IP addresses (IPv4; IPv6 simplified)
  out = out.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[ip redacted]');
  out = out.replace(/\b(?:[a-fA-F0-9]{1,4}:){2,}[a-fA-F0-9:]*\b/g, '[ip redacted]');
  // Long hex strings (e.g. tokens, hashes)
  out = out.replace(/\b[a-fA-F0-9]{24,}\b/g, '[hex redacted]');
  // Base64-like strings
  out = out.replace(/\b[A-Za-z0-9+/]{20,}={0,2}\b/g, '[token redacted]');
  // Common UID patterns
  out = out.replace(/\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\b/g, '[uid redacted]');
  out = out.replace(/\b[a-zA-Z0-9]{28}\b/g, '[uid redacted]');
  out = out.replace(/\s+/g, ' ').trim();
  return out.slice(0, maxLength);
};
