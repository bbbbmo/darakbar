import dayjs from 'dayjs'

/**
 * Date 객체를 로컬 시간대의 PostgreSQL TIMESTAMP 형식 문자열로 변환
 * @param date Date 객체
 * @returns YYYY-MM-DD HH:mm:ss 형식의 문자열
 */
export const toLocalTimestamp = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
