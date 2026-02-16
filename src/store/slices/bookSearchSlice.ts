import { createSlice } from '@reduxjs/toolkit'

export interface DataTypeState {
    id:string
    title: string
    thumbnail: string
}

const initialState: DataTypeState[] = [
     ]

export const BookSearchSlice = createSlice({
    name: 'BookSearchSlice',
    initialState,
    reducers: {
        addBook: (state, action) => [
            ...state, action.payload
        ],
        makeNewList: (state, action) => [...action.payload]
    },
})

// Action creators are generated for each case reducer function
export const { addBook,makeNewList } = BookSearchSlice.actions

export default BookSearchSlice.reducer