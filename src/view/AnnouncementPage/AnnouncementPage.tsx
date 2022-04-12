import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useSelectorTyped } from '../../redux'
import { ReactComponent as ArrowLeft } from '../../assets/ArrowLeft.svg'
import './announcementPage.scss'
import {
  clearError,
  clearSelectedAnnouncement,
  fetchAnnouncementById,
  fetchSimilarAnnouncement,
  removeAnnouncement,
} from '../../redux/features/announcements'
import { Button, Snackbar, Typography } from '@mui/material'
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard'
import ModalEdit from '../../components/ModalEdit/ModalEdit'

import { ReactComponent as Calendar } from '../../assets/Calendar.svg'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function showFormattedDate(dateObj: Date) {
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return `${month} ${day}th, ${year}`
}

export default function AnnouncementPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedAnnouncement, loading, similarAnnouncements, error } =
    useSelectorTyped(({ announcements }) => ({
      selectedAnnouncement: announcements.selectedAnnouncement,
      loading: announcements.loading,
      similarAnnouncements: announcements.similarAnnouncements,
      error: announcements.error,
    }))

  const fetchData = useCallback(async () => {
    try {
      const response = await dispatch(
        fetchAnnouncementById(id as string)
      ).unwrap()
      await dispatch(fetchSimilarAnnouncement(response)).unwrap()
    } catch (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }, [id, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const backHomepage = () => {
    dispatch(clearSelectedAnnouncement())
    navigate('/announcement-ts/')
  }

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleDelete = async () => {
    try {
      await dispatch(removeAnnouncement(selectedAnnouncement.id)).unwrap()
      navigate('/announcement-ts/')
    } catch (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }

  return (
    <>
      {!loading ? (
        <>
          <Button
            onClick={backHomepage}
            startIcon={<ArrowLeft className="icon-arrow-left" />}
          >
            Back to homepage
          </Button>

          <div className="content-announcement">
            <div className="wrapper">
              <Typography variant="h2">{selectedAnnouncement.title}</Typography>
              <div className="date-wrapper">
                <Calendar className="icon-calendar" />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#363636',
                    opacity: '0.6',
                    fontSize: '14px',
                  }}
                >
                  {showFormattedDate(new Date(selectedAnnouncement.date))}
                </Typography>
              </div>
            </div>
            <p>{selectedAnnouncement.body}</p>
            <div className="button-wrapper">
              <Button variant="contained" onClick={handleClick}>
                Edit
              </Button>

              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          <Typography variant="h5" color="text.secondary" textAlign="center">
            Similar announcements
          </Typography>
          <ul className="announcements-list">
            {similarAnnouncements?.length > 0 &&
              similarAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  searchValue={''}
                />
              ))}
          </ul>
          <ModalEdit isOpen={isModalOpen} onClose={handleClose} />
        </>
      ) : (
        <p>loading...</p>
      )}
      <Snackbar open={!!error} autoHideDuration={6000} message={error} />
    </>
  )
}
