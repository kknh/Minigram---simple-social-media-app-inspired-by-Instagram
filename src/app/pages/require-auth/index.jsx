import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectUserLoggedStatus,
	signOutUser,
} from '../../../features/authSlice'

const RequireAuth = () => {
	const dispatch = useDispatch()
	console.log('RequireAuth rendered')

	const isAuth = useSelector(selectUserLoggedStatus)

	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
