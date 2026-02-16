import { createSlice } from "@reduxjs/toolkit"

export interface BookSearchPageTypeState {
    id: string
    title: string
    thumbnail: string
    discription: string
}

const initialState: BookSearchPageTypeState = {
    id: "string",
    title: "string",
    thumbnail: "string",
    discription: "string"
}

export const BookSearchPageSlice = createSlice({
    name: 'BookSearchPageSlice',
    initialState,
    reducers: {
        formABookSearchPage: (state, action) => {
            return {
                id: action.payload.id,
                title: action.payload.title,
                thumbnail: action.payload.thumbnail,
                discription: action.payload.discription
            }
        }
    }
})

export const { formABookSearchPage } = BookSearchPageSlice.actions

export default BookSearchPageSlice.reducer