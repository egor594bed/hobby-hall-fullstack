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
      state.toastList = [...state.toastList, toast.payload]
    },
    autoRemoveToast: (state, id) => {
      for (let i = 0; i < state.toastList.length; i++) {
        if (state.toastList[i].id == id.payload) {
          state.toastList.splice(i , 1)
          break
        }
        break
      }
    },
    removeOnClick: (state, id) => {
      for (let i = 0; i < state.toastList.length; i++) {
        if (state.toastList[i].id == id.payload) {
          state.toastList.splice(i , 1)
          break
        }
      }
    }
  },
})

export const { addToast, autoRemoveToast, removeOnClick } = ToastsSlice.actions

export default ToastsSlice.reducer