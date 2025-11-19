/**
 * @description 이미지 파일 유효성 검사
 * @param file 업로드할 이미지 파일
 */
export const imageFileValidation = (file: File) => {
  // 파일 유효성 검사
  if (!file) {
    throw new Error('파일이 선택되지 않았습니다.')
  }

  // 이미지 파일 타입 체크
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드 가능합니다.')
  }

  // 파일 크기 체크 (1MB 이하)
  if (file.size > 1024 * 1024) {
    throw new Error('파일 크기는 1MB를 넘을 수 없습니다.')
  }

  // 파일 확장자 체크
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ]
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      '지원하지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WebP만 지원)',
    )
  }
}
