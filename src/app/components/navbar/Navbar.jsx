import styles from './Navbar.module.css'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signOutUser } from '../../../features/authSlice'
import { ReactComponent as Home } from '../../../assets/icons/home.svg'
import { ReactComponent as Inbox } from '../../../assets/icons/inbox.svg'
import { ReactComponent as NewPost } from '../../../assets/icons/new-post.svg'
import { ReactComponent as Activity } from '../../../assets/icons/activity.svg'

const Navbar = () => {
	console.log('Navbar rendered')
	const dispatch = useDispatch()
	const [showProfileDropdown, setShowProfileDropdown] = useState(false)
	const onSignOutHandler = () => {
		dispatch(signOutUser())
	}
	return (
		<>
			<nav className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.logo}>Minigram</div>
					<div className={styles.searchContainer}>
						<form>
							<input
								className={styles.searchInput}
								name="search"
								placeholder="search"
							/>
						</form>
					</div>
					<ul className={styles.links}>
						<li>
							<Link to="/">
								<Home />
							</Link>
						</li>
						<li>
							<Link to="/">
								<Inbox />
							</Link>
						</li>
						<li>
							<Link to="/">
								<NewPost />
							</Link>
						</li>
						<li>
							<Link to="/">
								<Activity />
							</Link>
						</li>
						<li>
							<div className={styles.profile}>
								<img
									onClick={() => setShowProfileDropdown((prev) => !prev)}
									className={styles.profileImg}
									src="./images/profile_kunho.jpg"
									alt="kunho profile"
								/>
								<div
									className={styles.profileDropdown}
									style={{ display: showProfileDropdown ? 'flex' : 'none' }}
								>
									<Link to="/profile">Profile</Link>
									<Link to="/login" onClick={onSignOutHandler}>
										Logout
									</Link>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</nav>
			<Outlet />
		</>
	)
}
export default Navbar
