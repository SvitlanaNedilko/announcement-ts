import { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Snackbar } from '@mui/material'
import { useAppDispatch, useSelectorTyped } from '../../redux'
import { addAnnouncement, clearError } from '../../redux/features/announcements'

const Modal: FC = () => {
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState<IAnnouncement>(
    {} as IAnnouncement
  )
  const dispatch = useAppDispatch()
  const { error, loading } = useSelectorTyped((state) => ({
    error: state.announcements.error,
    loading: state.announcements.loading,
  }))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = (event: any) => {
    const name = event.target.name.trim()
    const value = event.target.value.trim()
    updateAnnouncement(name, value)
  }

  const updateAnnouncement = (name: keyof IAnnouncement, value: string) => {
    setAnnouncement((prev) => ({ ...prev, [name]: value } as IAnnouncement))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await dispatch(
        addAnnouncement({ ...announcement, id: uuidv4(), date: Date.now() })
      ).unwrap()
      handleClose()
    } catch (error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new announcement
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new announcement</DialogTitle>
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
              required
            />
            <TextField
              name="body"
              label="Text"
              type="text"
              onChange={handleInputChange}
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
            disabled={loading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!error} autoHideDuration={6000} message={error} />
    </div>
  )
}

export default Modal
