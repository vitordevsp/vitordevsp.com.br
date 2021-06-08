export interface ArrayVideosProps {
  items: {
    id: {
      kind: string
      videoId: string
    }
    snippet: {
      publishedAt: string
      title: string
      description: string
      thumbnails: {
        default: {
          url: string
          width: number
          height: number
        }
        medium: {
          url: string
          width: number
          height: number
        }
        high: {
          url: string
          width: number
          height: number
        }
      }
    }
  }[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}
