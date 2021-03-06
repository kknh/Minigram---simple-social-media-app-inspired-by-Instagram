import styles from './index.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../../../../features/postsSlice'
import { selectPostsStatus } from '../../../../features/postsSlice'
import { selectUserId } from '../../../../features/authSlice'
import { API_STATUS } from '../../../../api/apiStatus'
import SelectImage from './select-image'
import CropImage from './crop-image'
import { getCroppedImg } from './canvasUtils'

const AddPost = ({ showPostModal, setShowPostModal }) => {
	const dispatch = useDispatch()
	const postsStatus = useSelector(selectPostsStatus)
	const loggedUserId = useSelector(selectUserId)

	const [imageSrc, setImageSrc] = useState(null)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

	const closePostModal = (e) => {
		if (e.target.closest('#modal') && !e.target.closest('#shareBtn')) {
			return
		}
		setShowPostModal(false)
		setImageSrc(null)
		document.body.style.overflow = 'visible'
	}

	const submitNewPost = async (e) => {
		if (postsStatus === API_STATUS.LOADING) return
		const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
		dispatch(addNewPost({ croppedImage, loggedUserId }))
		closePostModal(e)
	}

	return (
		<article
			onClick={closePostModal}
			className={styles.container}
			style={{ display: showPostModal ? 'flex' : 'none' }}
		>
			<div id="modal" className={styles.wrapper}>
				{imageSrc ? (
					<div className={styles.heading}>
						<h2>Crop</h2>
						<button id="shareBtn" onClick={submitNewPost}>
							Share
						</button>
					</div>
				) : (
					<div className={styles.heading}>
						<h2>Create New Post</h2>
					</div>
				)}

				{imageSrc ? (
					<CropImage
						imageSrc={imageSrc}
						setCroppedAreaPixels={setCroppedAreaPixels}
					/>
				) : (
					<SelectImage setImageSrc={setImageSrc} />
				)}
			</div>
			<button className={styles.closeModalBtn}>✖</button>
		</article>
	)
}
export default AddPost
