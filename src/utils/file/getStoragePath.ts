export const getBarImagePath = (barId: number) => {
  return `/bars/${barId}/bar-images`
}

export const getSignatureCocktailImagePath = (barId: number) => {
  return `/bars/${barId}/signature-cocktails`
}

export const getReviewImagePath = (barId: number, userId: string) => {
  return `/bars/${barId}/review-images/${userId}`
}
