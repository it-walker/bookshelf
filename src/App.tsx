import React, {useEffect, useState} from 'react'
import ReactModal from 'react-modal'

import './App.scss'
import {Button, Heading, ThemeProvider, View} from '@aws-amplify/ui-react'

import {BookDescription} from './components/books/BookDescription'
import BookRow from './components/books/BookRow'
import BookSearchDialog from './components/books/BookSearchDialog'
import {BookToRead} from './components/books/BookToRead'

import '@aws-amplify/ui-react/styles.css'
import '@fontsource/inter/variable.css'

import theme from './components/theme'


ReactModal.setAppElement('#root')

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)'
  }
}

const APP_KEY = 'react-hooks-tutorial'

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [books, setBooks] = useState([] as BookToRead[])

  useEffect(() => {
    const storedBooks = localStorage.getItem(APP_KEY)
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(books))
  }, [books])

  const handleAddClick = () => {
    setModalIsOpen(true)
  }

  const handleModalClose = () => {
    setModalIsOpen(false)
  }

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: '' }
    const newBooks = [...books, newBook]
    setBooks(newBooks)
    setModalIsOpen(false)
  }

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id
        ? { ...b, memo: memo }
        : b
    })
    setBooks(newBooks)
  }

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id)
    setBooks(newBooks)
  }

  const bookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    )
  })

  return (
    <ThemeProvider theme={theme}>
      <View className='App'>
        <View>
          <link rel='preconnect' href='https://fonts.googleapis.com'/>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
              href='https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap'
              rel='stylesheet'
          />
        </View>
        <View className='nav'>
          <Heading level={1}>読みたい本リスト</Heading>
          <Button variation='primary' onClick={handleAddClick}>本を追加</Button>
        </View>
        <View className='main'>
          {bookRows}
        </View>
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}
            style={customStyles}
        >
          <BookSearchDialog maxResults={20} onBookAdd={(b) => handleBookAdd(b)} />
        </ReactModal>
      </View>
    </ThemeProvider>
  )
}

export default App
