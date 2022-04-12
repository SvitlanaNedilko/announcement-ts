import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Snackbar } from '@mui/material'
import {
  clearError,
  updateAnnouncement,
} from '../../redux/features/announcements'
import { useAppDispatch, useSelectorTyped } from '../../redux'

interface IModalProps {
  onClose: () => void
  isOpen: boolean
}

const ModalEdit: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const { selectedAnnouncement, error } = useSelectorTyped((state) => ({
    selectedAnnouncement: state.announcements.selectedAnnouncement,
    error: state.announcements.error,
  }))
  const [announcement, setAnnouncement] = useState<IAnnouncement>(
    {} as IAnnouncement
  )

  useEffect(() => {
    setAnnouncement(selectedAnnouncement)
  }, [selectedAnnouncement])

  const handleClose = () => {
    onClose()
  }

  const handleInputChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    changedAnnouncement(name, value)
  }

  const changedAnnouncement = (name: keyof IAnnouncement, value: string) => {
    setAnnouncement((prev) => ({ ...prev, [name]: value } as IAnnouncement))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await dispatch(updateAnnouncement(announcement)).unwrap()
      handleClose()
    } catch (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }

  return (
    <>
      <div>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Edit announcement</DialogTitle>
          <DialogContent>
            <Box
              sx={{ padding: 2, display: 'grid', gap: 2, minWidth: '450px' }}
              component="form"
              id="announcement-form"
            >
              <TextField
                name="title"
                label="Title"
                type="text"
                onChange={handleInputChange}
                value={announcement.title}
                required
              />
              <TextField
                name="body"
                label="Text"
                type="text"
                onChange={handleInputChange}
                value={announcement.body}
                required
                multiline
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              form="announcement-form"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000} message={error} />
    </>
  )
}

export default ModalEdit
