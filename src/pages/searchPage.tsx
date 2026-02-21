import { useDispatch, useSelector } from 'react-redux'
import './pagesCss.css'
import { CardComponent } from '../components/cardComponent'
import type { RootState } from '../store/store'
import { makeNewList, type DataTypeState } from '../store/slices/bookSearchSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const SearchPage = () => {
    const booksearch = useSelector((state: RootState) => state.booksearch)
    const dispatch = useDispatch()

    type searchDataType = {
        searchTitle: string,
        searchAuthor: string,
        searchPublisher: string
    }

    //useState ЗАГРУЗКИ
    const [loadingFlag, setLoadingFlag] = useState(0)
    //-----------------


    //useState ПАГИНАЦИИ
    const [paginationData, setPaginationData] = useState<number>(0)
    //------------------

    //useState для поиска
    const [searchData, setData] = useState<searchDataType>({
        searchTitle: '',
        searchAuthor: '',
        searchPublisher: '',
    })
    //-------------------


    // useEffect создающий новый лист поиска
    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=мир')
            .then(data => data.data.items)
            .then(items => {
                const newBookList = items.map((e: any) => {
                    const cardBook = {
                        id: e.id,
                        title: e.volumeInfo.title,
                        thumbnail: e.volumeInfo.imageLinks?.thumbnail || 'https://avatars.mds.yandex.net/i?id=5eeabc5f3711448db0945d8ecf0c5905_l-9181740-images-thumbs&n=13'
                    }
                    return cardBook
                })
                dispatch(makeNewList(newBookList))
            })
    }, [paginationData])
    //-------------------------------------

    //callBack создающий новый лист поиска по запросу
    const onButtonClickCallBack = () => {
        let newRequest = `https://www.googleapis.com/books/v1/volumes?q=startIndex=${paginationData}`

        //Формируем запрос для ПОИСКА
        if (searchData.searchTitle !== '') {
            newRequest = newRequest + `+intitle:${searchData.searchTitle}`
            newRequest = newRequest.replace(/ /g, '+')
        }
        if (searchData.searchAuthor !== '') {
            newRequest = newRequest + `+inauthor:${searchData.searchAuthor}`
            newRequest = newRequest.replace(/ /g, '+')
        }
        if (searchData.searchPublisher !== '') {
            newRequest = newRequest + `+inpublisher:${searchData.searchPublisher}`
            newRequest = newRequest.replace(/ /g, '+')
        }

        //-------------------------------------------
        setLoadingFlag(1)
        axios.get(newRequest)
            .then(data => {

                return data.data.items || []
            }
            )
            .then(items => {
                const newBookList = items.map((e: any) => {
                    const cardBook = {
                        id: e.id,
                        title: e.volumeInfo.title,
                        thumbnail: e.volumeInfo.imageLinks?.thumbnail || 'https://avatars.mds.yandex.net/i?id=5eeabc5f3711448db0945d8ecf0c5905_l-9181740-images-thumbs&n=13'
                    }
                    return cardBook
                })
                dispatch(makeNewList(newBookList))
            })
            .catch(error => {
                console.error('Ошибка при запросе:', error);
                dispatch(makeNewList([]));
            })
            .finally(() => setLoadingFlag(0))
    }
    //----------------------------------------------

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

    if (loadingFlag === 1) {
        return <div>ЗАГРУЗКА</div>
    } else {
        return (
            <div className='SearchPageClass'>

                {/* Инпут ПОИСКА НАЗВАНИЯ*/}
                <span> НАЗВАНИЕ:
                    <input type='search'
                        value={searchData.searchTitle}
                        onChange={e => setData((prev) => {
                            return { ...prev, searchTitle: e.target.value }
                        })}
                    >
                    </input>
                </span>
                {/* ---------------------- */}
                {/* Инпут ПОИСКА АВТОРА*/}
                <span>АВТОР:
                    <input type='search'
                        value={searchData.searchAuthor}
                        onChange={e => setData((prev) => {
                            return { ...prev, searchAuthor: e.target.value }
                        })}
                    >
                    </input>
                </span>
                {/* ---------------------- */}
                {/* Инпут ПОИСКА ИЗДАТЕЛЯ*/}
                <span>ИЗДАТЕЛЬ:
                    <input type='search'
                        value={searchData.searchPublisher}
                        onChange={e => setData((prev) => {
                            return { ...prev, searchPublisher: e.target.value }
                        })}
                    >
                    </input>
                </span>
                {/* ---------------------- */}
                {/* Инпут ПАГИНАЦИИ*/}
                <span>Пагинация:
                    <button onClick={e =>setPaginationData(prev => prev - 1)}>-</button>
                    <span>{paginationData}</span>
                    <button onClick={e => setPaginationData(prev => prev + 1)}>+</button>
                </span>
                {/* ---------------------- */}


                <button onClick={onButtonClickCallBack}>ПОИСК</button>

                {booksearch.map(e => cardComposer(e))}

            </div >
        )
    }

}