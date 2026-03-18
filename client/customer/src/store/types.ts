export interface AuthUser {
	id: number
	account: string
	created_at: string
}

export interface AuthState {
	isLoggedIn: boolean
	token: string | null
	user: AuthUser | null
	loading: boolean
}

export interface BookingState {
	city: string
	checkInDate: string
	checkOutDate: string
	guestCount: number
}