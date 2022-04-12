import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'

import './announcementCard.scss'

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

interface IAnnouncementCardProps {
  announcement: IAnnouncement
  searchValue: string
}

const AnnouncementCard: React.FC<IAnnouncementCardProps> = ({
  announcement,
  searchValue,
}) => {
  function getHighlightedHtml(text: string) {
    return text.replace(
      new RegExp(`${searchValue}`, 'ig'),
      "<em class='highlighted'>$&</em>"
    )
  }

  const shortenedAnnouncement =
    announcement.body.length > 100
      ? `${announcement.body.slice(0, 100)}...`
      : announcement.body

  return (
    <li key={announcement.id} className="announcement-card">
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontSize: '24px',
              lineHeight: '29px',
              color: '#363636',
              paddingBottom: '20px',
            }}
            dangerouslySetInnerHTML={
              searchValue
                ? { __html: getHighlightedHtml(announcement.title) }
                : { __html: announcement.title }
            }
          />
          <Typography variant="body2" color="text.secondary">
            {shortenedAnnouncement}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            marginTop: 'auto',
            padding: '16px',
          }}
        >
          <Link href={`announcement-ts/${announcement.id}`}>Details</Link>
        </CardActions>
      </Card>
    </li>
  )
}

export default AnnouncementCard
