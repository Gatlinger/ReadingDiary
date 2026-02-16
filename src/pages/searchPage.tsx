import { useDispatch, useSelector } from 'react-redux'
import './pagesCss.css'
import { CardComponent } from '../components/cardComponent'
import type { RootState } from '../store/store'
import { makeNewList, type DataTypeState } from '../store/slices/bookSearchSlice'
import { useEffect } from 'react'
import axios from 'axios'

export const SearchPage = () => {
    const booksearch = useSelector((state: RootState) => state.booksearch)
    const dispatch = useDispatch()

    // useEffect создающий новый лист поиска
    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=fencing')
            .then(data => data.data.items)
            .then(items => {
                const newBookList = items.map((e: any) => {
                    const cardBook = {
                        id: e.id,
                        title: e.volumeInfo.title,
                        thumbnail: e.volumeInfo.imageLinks.thumbnail
                    }
                    return cardBook
                })
                dispatch(makeNewList(newBookList))
            })
    }, [])
    //-------------------------------------

    // Формируем книгу для CardComponent и отрисовываем ее
    const cardComposer = (e: DataTypeState) => {
        const cardBook = {
            id: e.id,
            title: e.title,
            thumbnail: e.thumbnail
        }
        return <CardComponent book={cardBook} />
    }
    //----------------------------------------------------
    return (
        <div className='SearchPageClass'>
            {booksearch.map(e => cardComposer(e))}
        </div>
    )
}