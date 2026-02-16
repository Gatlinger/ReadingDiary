import { useDispatch, useSelector } from 'react-redux'
import './pagesCss.css'
import type { RootState } from '../store/store'

type BookPageType = {
    id: string
}

export const BookPage = (props: BookPageType) => {
    const booksearch = useSelector((state: RootState) => state.booksearch)
    const dispatch = useDispatch()


    return (
        <div className="BookPageClass">
            111
        </div>
    )
}