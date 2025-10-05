// src/lib/dayjs.ts
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/ko'

// 플러그인 & 로케일 한 번만 세팅
dayjs.extend(isLeapYear)
dayjs.locale('ko')

// 이 모듈을 통해서만 dayjs를 사용
export default dayjs
