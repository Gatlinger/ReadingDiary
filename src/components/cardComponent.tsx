import { useNavigate } from 'react-router-dom'
import './cardComponent.css'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { formABookSearchPage } from '../store/slices/bookSearchPageSlice'

type CardComponentType = {
    book: {
        id: string
        title: string
        thumbnail: string
    }
}

export const CardComponent = (props: CardComponentType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    //Делаем переход на страницу книги из поиска
    const bookPageIDLink = () => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${props.book.id}`)
            .then(data => data.data)
            .then(data => dispatch(formABookSearchPage(
                {
                    id: data.id,
                    publisher: data.volumeInfo.publisher,
                    title: data.volumeInfo.title,
                    thumbnail: data.volumeInfo.imageLinks?.thumbnail || 'https://avatars.mds.yandex.net/i?id=5eeabc5f3711448db0945d8ecf0c5905_l-9181740-images-thumbs&n=13',
                    discription: data.volumeInfo.description
                }
            )))
            .then(() => navigate('/booksearch'))
    }
    //-------------------------------------------------------

    return (
        <>
            <div>Title: {props.book.title}</div>
            <div className='CardDiv' onClick={bookPageIDLink}>
                <img src={props.book.thumbnail} alt='обложка книги'></img>
            </div>
        </>
    )
}