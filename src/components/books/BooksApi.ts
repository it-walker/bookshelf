export type BookItem = {
  volumeInfo: VolumeInfo
}

export type IndustryIdentify = {
  type: string
  identifier: string
}

export type ReadingModes = {
  text: boolean
  image: boolean
}

export type ImageLinks = {
  smallThumbnail: string
  thumbnail: string
}

export type VolumeInfo = {
  title: string
  authors: string[]
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentify[]
  readingModes: ReadingModes
  imageLinks: ImageLinks
}

export type SearchedBooksResult = {
  kind: string
  items: BookItem[]
  totalItems: number
}
