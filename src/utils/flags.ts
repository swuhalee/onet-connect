/**
 * ISO 국가 코드를 국기 이모지로 변환합니다.
 * @param {string} countryCode - 예: "KR", "US"
 * @returns {string} 국기 이모지
 */
export const getFlagEmoji = (countryCode: string) => {
    if (!countryCode || countryCode.length !== 2) return '';

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
};
