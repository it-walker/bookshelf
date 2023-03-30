import React from 'react'

import {Button, Heading, Text, View} from '@aws-amplify/ui-react'

import {BookDescription} from './BookDescription'

type BookSearchItemProps = {
    description: BookDescription
    onBookAdd: (book: BookDescription) => void
}

const BookSearchItem = (props: BookSearchItemProps) => {
    const { title, authors, thumbnail } = props.description
    const handleAddBookClick = () => {
        props.onBookAdd(props.description)
    }

    return (
        <View className='book-search-item'>
            <Heading title={title} level={2}>{title}</Heading>
            <Text
                className={'authors'}
                title={authors}
            >
                {authors}
            </Text>
            {thumbnail ? <img src={thumbnail} alt=''/> : null}
            <Button
                className='add-book'
                onClick={handleAddBookClick}
                variation='menu'
            >
                <span>+</span>
            </Button>
        </View>
    )
}

export default BookSearchItem