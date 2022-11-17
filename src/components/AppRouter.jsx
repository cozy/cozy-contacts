import React from 'react'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'

import App from 'components/App'
import ContactImportationModal from 'components/ContactImportationModal'
import ContactFormModal from 'components/Modals/ContactFormModal'
import ContactInfoModal from 'components/Modals/ContactInfoModal'
import ConfirmDeleteModal from 'components/Modals/ConfirmDeleteModal'
import AppLayout from './AppLayout'

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OutletWrapper Component={App} />}>
            <Route path="import" element={<ContactImportationModal />} />
            <Route path="new" element={<ContactFormModal />} />
            <Route path=":contactId" element={<ContactInfoModal />} />
            <Route path=":contactId/edit" element={<ContactFormModal />} />
            <Route path=":contactId/delete" element={<ConfirmDeleteModal />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRouter
