export const getBarImagePath = (barId: number) => {
  return `/bars/${barId}/bar-images`
}

export const getSignatureCocktailImagePath = (barId: number) => {
  return `/bars/${barId}/signature-cocktails`
}

export const getReviewImagePath = (barId: number, userId: string) => {
  return `/bars/${barId}/review-images/${userId}`
}

export const getUserProfileImagePath = (userId: string) => {
  return `/users/${userId}/profile`
}

export const getPostImagePath = (postId: number) => {
  return `/posts/${postId}/post-images`
}

export const getNewMenuImagePath = (postId: number) => {
  return `/posts/${postId}/new-menu-images`
}
