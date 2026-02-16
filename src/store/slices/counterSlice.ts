import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'basic',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer