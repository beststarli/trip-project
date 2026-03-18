import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthUser, BookingState } from './types'

const initialAuthState: AuthState = {
	isLoggedIn: false,
	token: null,
	user: null,
	loading: false,
}

const initialBookingState: BookingState = {
	city: '南京',
	checkInDate: '',
	checkOutDate: '',
	guestCount: 1,
}

export const loadUserProfile = createAsyncThunk<AuthUser, void, { state: RootState }>(
	'auth/loadUserProfile',
	async (_arg, thunkApi) => {
		const token = thunkApi.getState().auth.token

		if (!token) {
			throw new Error('未登录')
		}

		return {
			id: 1,
			account: '13800000000',
			created_at: '2026-03-06T00:00:00.000Z',
		}
	},
)

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<{
				token: string
				user: AuthUser
			}>,
		) => {
			state.isLoggedIn = true
			state.token = action.payload.token
			state.user = action.payload.user
		},
		logout: (state) => {
			state.isLoggedIn = false
			state.token = null
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadUserProfile.pending, (state) => {
			state.loading = true
		})
		builder.addCase(loadUserProfile.fulfilled, (state, action) => {
			state.loading = false
			state.user = action.payload
		})
		builder.addCase(loadUserProfile.rejected, (state) => {
			state.loading = false
		})
	},
})

const bookingSlice = createSlice({
	name: 'booking',
	initialState: initialBookingState,
	reducers: {
		setCity: (state, action: PayloadAction<string>) => {
			state.city = action.payload
		},
		setDateRange: (
			state,
			action: PayloadAction<{
				checkInDate: string
				checkOutDate: string
			}>,
		) => {
			state.checkInDate = action.payload.checkInDate
			state.checkOutDate = action.payload.checkOutDate
		},
		setGuestCount: (state, action: PayloadAction<number>) => {
			state.guestCount = action.payload
		},
		resetBookingDraft: (state) => {
			state.city = '南京'
			state.checkInDate = ''
			state.checkOutDate = ''
			state.guestCount = 1
		},
	},
})

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		booking: bookingSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { loginSuccess, logout } = authSlice.actions
export const { setCity, setDateRange, setGuestCount, resetBookingDraft } = bookingSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAuthLoading = (state: RootState) => state.auth.loading

export const selectBookingDraft = (state: RootState) => state.booking
export const selectBookingCity = (state: RootState) => state.booking.city
