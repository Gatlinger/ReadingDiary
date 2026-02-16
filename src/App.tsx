import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store/store'
import { ToolBar } from './components/toolBar'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/mainPage'
import { BookPage } from './pages/bookPage'
import { SearchPage } from './pages/searchPage'
import { BookSearchPage } from './pages/bookSearchPage'

function App() {
  const booksearch = useSelector((state: RootState) => state.booksearch)
  const dispatch = useDispatch()

  return (
    <div>
      {/* Здесь идет тулбар */}
      <ToolBar />
      {/* Здесь прописан Рутинг */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/book" element={<BookPage id={'111'}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/booksearch" element={<BookSearchPage />} />
      </Routes>
    </div>
  )
}

export default App
