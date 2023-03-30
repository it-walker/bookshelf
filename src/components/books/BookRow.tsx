import React from 'react'

import {Button, Flex, TextField, View} from '@aws-amplify/ui-react'
import {FcEmptyTrash} from 'react-icons/fc'

import {BookToRead} from './BookToRead'

type BookRowProps = {
  book: BookToRead
  onMemoChange: (id: number, memo: string) => void
  onDelete: (id: number) => void
}

const BookRow = (props: BookRowProps) => {
  const { title, authors, memo } = props.book

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onMemoChange(props.book.id, e.target.value)
  }

  const handleDeleteClick = () => {
      props.onDelete(props.book.id)
  }

  return (
    <Flex
        direction='row'
        className='book-row'
    >
        <View
            title={title}
            className='title'
        >
            {title}
        </View>
        <View
            title={authors}
            className='authors'
        >
            {authors}
        </View>
        <TextField
            className='memo'
            value={memo}
            onChange={handleMemoChange}
            label='memo'
            labelHidden={true}
            placeholder='◯月×日に購入予定'
        />
        <Button
            name='delete_book_item'
            size='large'
            onClick={handleDeleteClick}
        >
            <FcEmptyTrash/>
        </Button>
    </Flex>
  )
}

export default BookRow