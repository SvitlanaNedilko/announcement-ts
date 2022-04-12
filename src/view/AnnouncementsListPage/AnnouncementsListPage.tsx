import React, { useState, useEffect } from 'react'

import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard'
import Modal from '../../components/Modal/Modal'
import TextField from '@mui/material/TextField'
import './announcementsListPage.scss'

import { useAppDispatch, useSelectorTyped } from '../../redux'
import {
  clearError,
  fetchAllAnnouncements,
  fetchAnnouncementsByTitle,
} from '../../redux/features/announcements'
import { Snackbar, Typography } from '@mui/material'

const AnnouncementsListPage: React.FC = () => {
  const [textInputValue, setTextInputValue] = useState<string>('')

  const dispatch = useAppDispatch()
  const { announcements, loading, error } = useSelectorTyped(
    ({ announcements }) => ({
      announcements: announcements.announcements,
      loading: announcements.loading,
      error: announcements.error,
    })
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTextInputValue(event.target.value)
  }

  async function loadAnnouncements(search: string) {
    try {
      if (search === '') {
        await dispatch(fetchAllAnnouncements()).unwrap()
      } else {
        await dispatch(fetchAnnouncementsByTitle(search)).unwrap()
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }

  useEffect(() => {
    loadAnnouncements(textInputValue)
  }, [textInputValue])

  return (
    <>
      <div className="search-container">
        <TextField
          sx={{
            height: 50,
            marginBottom: '50px',
            width: '600px',
          }}
          id="outlined-basic"
          label="Filter by title"
          variant="outlined"
          onChange={handleChange}
        />
        <Typography variant="h2" textAlign="center">
          Announcement
        </Typography>
        <div className="flex-container">
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1,
            }}
          >
            Results: {announcements?.length || 0}
          </Typography>

          <Modal />
        </div>
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul className="announcements-list">
          {announcements?.length > 0 &&
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                searchValue={textInputValue}
              />
            ))}
        </ul>
      )}
      <Snackbar open={!!error} autoHideDuration={6000} message={error} />
    </>
  )
}

export default AnnouncementsListPage
