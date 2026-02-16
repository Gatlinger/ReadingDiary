import { configureStore } from '@reduxjs/toolkit'
import counterReduser from './slices/counterSlice'
import bookSearchReduser  from './slices/bookSearchSlice'
import BookSearchPageReduser from './slices/bookSearchPageSlice'
export const store = configureStore({
  reducer: {
    counter: counterReduser,
    booksearch: bookSearchReduser,
    booksearchpage: BookSearchPageReduser
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch