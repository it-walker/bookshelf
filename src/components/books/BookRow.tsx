import React from 'react'
import { BookToRead } from './BookToRead'
import {Button, Flex, TextField, View} from '@aws-amplify/ui-react';

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
            variation='destructive'
            name='delete_book_item'
            className='delete-row'
            onClick={handleDeleteClick}
        >
            削除
        </Button>
    </Flex>
  )
}

export default BookRow