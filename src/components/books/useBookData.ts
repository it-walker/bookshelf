import {BookDescription} from "./BookDescription";
import {useEffect, useState} from "react";

export const useBookData = (title: string, author: string, maxResults: number) => {
    function buildSearchUrl(
        title: string,
        author: string,
        maxResults: number
    ): string {
        let url = 'https://www.googleapis.com/books/v1/volumes?q='
        const conditions: string[] = []
        if (title) {
            conditions.push(`intitle:${title}`)
        }
        if (author) {
            conditions.push(`inauthor:${author}`)
        }
        return url + conditions.join('+') + `&maxResults=${maxResults}`
    }

    function extractBooks(json: any): BookDescription[] {
        const items: any[] = json.items
        return items.map((item: any) => {
            const volumeInfo: any = item.volumeInfo
            console.log(volumeInfo)
            return {
                title: volumeInfo.title,
                authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : '',
                thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : ''
            }
        })
    }

    const [books, setBooks] = useState([] as BookDescription[])
    // const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (title || author) {
            const url = buildSearchUrl(title, author, maxResults)
            fetch(url)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    return extractBooks(json)
                })
                .then((books) => {
                    console.log(books)
                    setBooks(books)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        // setIsSearching(false)
    }, [title, author, maxResults])

    return books
}