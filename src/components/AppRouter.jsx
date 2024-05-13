import React from 'react'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import App from './App'
import AppLayout from './AppLayout'
import ContactImportationModal from './ContactImportationModal'
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal'
import ContactFormModal from './Modals/ContactFormModal'
import ContactInfoModal from './Modals/ContactInfoModal'
import GroupDeleteConfirmationModal from './Modals/GroupDeleteConfirmationModal'

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
            <Route
              path="group/:groupId/delete/:groupName"
              element={<GroupDeleteConfirmationModal />}
            />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRouter
