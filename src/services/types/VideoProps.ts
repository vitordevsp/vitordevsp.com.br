export interface VideoProps {
  items: {
    id: string
    snippet: {
      publishedAt: string
      title: string
      description: string
      thumbnails: {
        default: {
          url: string
          width: number
          height: number
        },
        medium: {
          url: string
          width: number
          height: number
        },
        high: {
          url: string
          width: number
          height: number
        },
        standard: {
          url: string
          width: number
          height: number
        },
        maxres: {
          url: string
          width: number
          height: number
        }
      },
      tags: string[]
      categoryId: string
    },
    statistics: {
      viewCount: string
      likeCount: string
      dislikeCount: string
      favoriteCount: string
      commentCount: string
    }
  }[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}
