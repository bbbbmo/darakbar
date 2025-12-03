/**
 * @description 문자열이 일정 길이(maxLength) 이상이라면 자르는 함수
 * @param text
 * @param maxLength
 */
export const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text
  }
  return `${text.slice(0, maxLength)}...`
}
