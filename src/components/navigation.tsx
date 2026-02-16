import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return (
        <ul>
        <li>
          <NavLink to={'/'}>MAIN</NavLink>
        </li>
        <li>
          <NavLink to={'/book'}>BOOK</NavLink>
        </li>
        <li>
          <NavLink to={'/search'}>SEARCH</NavLink>
        </li>
        <li>
          <NavLink to={'/booksearch'}>BookSEARCH</NavLink>
        </li>
      </ul>
    )
}