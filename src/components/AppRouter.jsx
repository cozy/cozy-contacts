import React from 'react'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'

import App from './App'
import AppLayout from './AppLayout'
import ContactImportationModal from './ContactImportationModal'
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal'
import ContactFormModal from './Modals/ContactFormModal'
import ContactInfoModal from './Modals/ContactInfoModal'

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
