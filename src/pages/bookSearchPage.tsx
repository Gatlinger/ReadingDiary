import { useSelector } from 'react-redux'
import './pagesCss.css'
import type { RootState } from '../store/store'

export const BookSearchPage = () => {
    const booksearchpage = useSelector((state: RootState) => state.booksearchpage)

    return (
        <div className="BookSearchPageClass">
            {booksearchpage.title}
            <img src={booksearchpage.thumbnail} alt="111" />
            {booksearchpage.discription}
        </div>
    )
}