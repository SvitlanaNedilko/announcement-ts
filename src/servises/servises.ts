import {
  addNewAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAllAnnouncements,
  getAnnouncementID,
  searchAnnouncements,
  similarAnnouncements,
} from '../storage/storage'

export function setAnnouncement(announcement: IAnnouncement) {
  return new Promise<IAnnouncement[]>((resolve) => {
    resolve(addNewAnnouncement(announcement))
  })
}

export function getAnnouncements() {
  return new Promise<IAnnouncement[]>((resolve) => {
    resolve(getAllAnnouncements())
  })
}

export function getAnnouncementsByTitle(title: string) {
  return new Promise<IAnnouncement[]>((resolve) => {
    resolve(searchAnnouncements(title))
  })
}

export function getAnnouncementId(id: string) {
  return new Promise<IAnnouncement>((resolve) => {
    resolve(getAnnouncementID(id))
  })
}

export function editAnnouncementService(announcement: IAnnouncement) {
  return new Promise<IAnnouncement>((resolve) => {
    resolve(editAnnouncement(announcement))
  })
}

export function deleteAnnouncementService(id: string) {
  return new Promise<IAnnouncement[]>((resolve) => {
    resolve(deleteAnnouncement(id))
  })
}

export function getSimilarAnnouncementService(announcement: IAnnouncement) {
  return new Promise<IAnnouncement[]>((resolve) => {
    resolve(similarAnnouncements(announcement))
  })
}
