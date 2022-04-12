import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

import {
  deleteAnnouncementService,
  editAnnouncementService,
  getAnnouncementId,
  getAnnouncements,
  getAnnouncementsByTitle,
  getSimilarAnnouncementService,
  setAnnouncement,
} from '../../servises/servises'

type TGenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type TPendingAction = ReturnType<TGenericAsyncThunk['pending']>
type TRejectedAction = ReturnType<TGenericAsyncThunk['rejected']>

function isPendingAction(action: AnyAction): action is TPendingAction {
  return action.type.endsWith('/pending')
}

function isRejectedAction(action: AnyAction): action is TRejectedAction {
  return action.type.endsWith('/rejected')
}

interface IAnnouncementsState {
  loading: boolean
  error: string

  newAnnouncement: IAnnouncement
  announcements: IAnnouncement[]
  selectedAnnouncement: IAnnouncement
  similarAnnouncements: IAnnouncement[]
}

const initialState: IAnnouncementsState = {
  loading: false,
  error: '',

  newAnnouncement: {} as IAnnouncement,
  announcements: [],
  selectedAnnouncement: {} as IAnnouncement,
  similarAnnouncements: [],
}

export const fetchAllAnnouncements = createAsyncThunk<
  IAnnouncement[],
  void,
  { rejectValue: string }
>('announcements/fetchAllAnnouncements', async (_, { rejectWithValue }) => {
  try {
    return await getAnnouncements()
  } catch (e: any) {
    return rejectWithValue('Something went wrong')
  }
})

export const fetchAnnouncementsByTitle = createAsyncThunk<
  IAnnouncement[],
  string,
  { rejectValue: string }
>('announcements/fetchAnnouncementsByTitle', async (title, { rejectWithValue }) => {
  try {
    return await getAnnouncementsByTitle(title)
  } catch (e: any) {
    return rejectWithValue('Something went wrong')
  }
})
export const fetchAnnouncementById = createAsyncThunk<
  IAnnouncement,
  string,
  { rejectValue: string }
>('announcements/fetchAnnouncementById', async (id, { rejectWithValue }) => {
  try {
    return await getAnnouncementId(id)
  } catch (e: any) {
    return rejectWithValue('Something went wrong')
  }
})

export const fetchSimilarAnnouncement = createAsyncThunk<
  IAnnouncement[],
  IAnnouncement,
  { rejectValue: string }
>(
  'announcements/fetchSimilarAnnouncement',
  async (announcement, { rejectWithValue }) => {
    try {
      return await getSimilarAnnouncementService(announcement)
    } catch (e: any) {
      return rejectWithValue('Something went wrong')
    }
  }
)

export const addAnnouncement = createAsyncThunk<
  IAnnouncement[],
  IAnnouncement,
  { rejectValue: string }
>('announcements/addAnnouncement', async (announcement, { rejectWithValue }) => {
  try {
    return await setAnnouncement(announcement)
  } catch (e: any) {
    return rejectWithValue('Something went wrong')
  }
})

export const updateAnnouncement = createAsyncThunk<
  IAnnouncement,
  IAnnouncement,
  { rejectValue: string }
>(
  'announcements/editAnnouncementService',
  async (announcement, { rejectWithValue }) => {
    try {
      return await editAnnouncementService(announcement)
    } catch (e: any) {
      return rejectWithValue('Something went wrong')
    }
  }
)

export const removeAnnouncement = createAsyncThunk<
  IAnnouncement[],
  string,
  { rejectValue: string }
>('announcements/removeAnnouncement', async (id, { rejectWithValue }) => {
  try {
    return await deleteAnnouncementService(id)
  } catch (e: any) {
    return rejectWithValue('Something went wrong')
  }
})

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    clearSelectedAnnouncement: (state) => {
      state.selectedAnnouncement = {} as IAnnouncement
    },
    clearError: (state) => {
      state.error = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addAnnouncement.fulfilled, (state, { payload }) => {
      state.announcements = payload
      state.loading = false
    })

    builder.addCase(fetchAllAnnouncements.fulfilled, (state, { payload }) => {
      state.announcements = payload
      state.loading = false
    })

    builder.addCase(fetchAnnouncementById.fulfilled, (state, { payload }) => {
      state.selectedAnnouncement = payload
      state.loading = false
    })

    builder.addCase(updateAnnouncement.fulfilled, (state, { payload }) => {
      state.selectedAnnouncement = payload
      state.loading = false
    })

    builder.addCase(removeAnnouncement.fulfilled, (state, { payload }) => {
      state.announcements = payload
      state.loading = false
    })

    builder.addCase(
      fetchAnnouncementsByTitle.fulfilled,
      (state, { payload }) => {
        state.announcements = payload
        state.loading = false
      }
    )

    builder.addCase(
      fetchSimilarAnnouncement.fulfilled,
      (state, { payload }) => {
        state.similarAnnouncements = payload
        state.loading = false
      }
    )

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true
    })
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.error = payload as string
      state.loading = false
    })
  },
})

export const { clearSelectedAnnouncement, clearError } =
  announcementSlice.actions

export default announcementSlice.reducer
