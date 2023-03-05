import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IToast } from '../../types/IToast'

export interface ToastsSlice {
    toastList: IToast[]
}

const initialState: ToastsSlice = {
    toastList: [],
}

export const ToastsSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    addToast: (state, toast: PayloadAction<IToast>) => {
      console.log(state.toastList)
      state.toastList = [...state.toastList, toast.payload]
    },
    autoRemoveToast: (state) => {
        state.toastList.splice(0, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToast, autoRemoveToast } = ToastsSlice.actions

export default ToastsSlice.reducer