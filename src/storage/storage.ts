export const addNewAnnouncement = (announcement: IAnnouncement) => {
  const currentAnnouncements = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  const allAnnouncements = [announcement, ...currentAnnouncements]
  localStorage.setItem('announcements', JSON.stringify(allAnnouncements))
  return allAnnouncements
}

export const getAllAnnouncements = () =>
  JSON.parse(localStorage.getItem('announcements') || '[]')

export const getAnnouncementID = (id: string): IAnnouncement => {
  const currentAnnouncements: IAnnouncement[] = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  return currentAnnouncements.filter(
    (announcement) => announcement.id === id
  )[0]
}

export const searchAnnouncements = (title: string): IAnnouncement[] => {
  const currentAnnouncements: IAnnouncement[] = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  return currentAnnouncements.filter((announcement) =>
    announcement.title.toLowerCase().includes(title.toLowerCase())
  )
}

export const editAnnouncement = (
  announcement: IAnnouncement
): IAnnouncement => {
  const currentAnnouncements: IAnnouncement[] = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  const newAnnouncements = currentAnnouncements.map((item) => {
    if (item.id === announcement.id) {
      return announcement
    }
    return item
  })
  localStorage.setItem('announcements', JSON.stringify(newAnnouncements))
  return announcement
}

export const deleteAnnouncement = (id: string): IAnnouncement[] => {
  const currentAnnouncements: IAnnouncement[] = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  const filteredAnnouncements = currentAnnouncements.filter(
    (announcement) => announcement.id !== id
  )

  localStorage.setItem('announcements', JSON.stringify(filteredAnnouncements))
  return filteredAnnouncements
}

export const similarAnnouncements = (
  announcement: IAnnouncement
): IAnnouncement[] => {
  const currentAnnouncements: IAnnouncement[] = JSON.parse(
    localStorage.getItem('announcements') || '[]'
  )
  const filteredAnnouncement = currentAnnouncements.filter(
    (currentAnnouncement) => currentAnnouncement.id !== announcement.id
  )
  const arrayTitle = announcement.title.split(' ')
  const arrayBody = announcement.body.split(' ')
  console.log('body\n', arrayBody)

  const searchQuery = new Set([...arrayTitle, ...arrayBody])
  console.log(searchQuery)

  const result: IAnnouncement[] = []
  searchQuery.forEach((element) => {
    const match = filteredAnnouncement.filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(element.toLowerCase()) ||
        announcement.body.toLowerCase().includes(element.toLowerCase())
    )

    result.push(...match)
  })

  const uniqResult: IAnnouncement[] = Array.from(new Set<IAnnouncement>(result))

  console.log(uniqResult)

  return uniqResult.slice(0, 3)
}
