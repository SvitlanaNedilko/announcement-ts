import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'

import AnnouncementsListPage from './view/AnnouncementsListPage/AnnouncementsListPage'
import AnnouncementPage from './view/AnnouncementPage/AnnouncementPage'

import './App.scss'

function App() {
  return (
    <div className="main-container">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AnnouncementPage />} path="announcement-ts/:id" />
            <Route
              element={<AnnouncementsListPage />}
              path="/announcement-ts/"
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
