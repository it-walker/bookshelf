import React, { DependencyList, EffectCallback, useEffect, useRef, useState } from "react";

import { Button, Flex, ThemeProvider, View } from '@aws-amplify/ui-react'
import { FcSearch } from 'react-icons/fc'

import { BookDescription } from './BookDescription'
import BookSearchItem from './BookSearchItem'
import { useBookData } from './useBookData'
import theme from '../theme'

type BookSearchDialogProps = {
  maxResults: number
  onBookAdd: (book: BookDescription) => void
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState(localStorage.getItem('search-text-title') ?? '')
  const [author, setAuthor] = useState(localStorage.getItem('search-text-author') ?? '')

  const books = useBookData(title, author, props.maxResults)

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = localStorage.getItem('search-text-title') ?? ''
    }
    if (authorRef.current) {
      authorRef.current.value = localStorage.getItem('search-text-author') ?? ''
    }
  }, [])

  const handleSave = (title: string, author: string): void => {
    localStorage.setItem('search-text-title', title);
    localStorage.setItem('search-text-author', author);
    };
  
  const handleSearchClick = () => {
    if (!(titleRef.current as HTMLInputElement).value && !(authorRef.current as HTMLInputElement).value) {
      alert('条件を入力してください')
      return
    }
    const titleValue = (titleRef.current as HTMLInputElement).value
    const authorValue = (authorRef.current as HTMLInputElement).value

    setTitle(titleValue)
    setAuthor(authorValue)
    handleSave(titleValue, authorValue)
  }

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book)
  }

  const bookItems = books.map((b, idx) => {
    return <BookSearchItem description={b} onBookAdd={(b) => handleBookAdd(b)} key={idx} />
  })

  return (
    <ThemeProvider theme={theme}>
      <View className="dialog">
        <Flex justifyContent="center" className="operation">
          <Flex direction="column" gap="5px">
            <input type="text" ref={titleRef} placeholder="タイトルで検索" />
            <input type="text" ref={authorRef} placeholder="著者名で検索" />
          </Flex>
          <Button variation="primary" onClick={handleSearchClick}>
            検索
            <FcSearch />
          </Button>
        </Flex>
        <View className="search-results">{bookItems}</View>
      </View>
    </ThemeProvider>
  )
}

export default BookSearchDialog
