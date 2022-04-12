import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import announcements from './features/announcements'

export const store = configureStore({
  reducer: { announcements },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<TAppDispatch>()
export const useSelectorTyped: TypedUseSelectorHook<TRootState> = useSelector
