import React from 'react'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { BarRoutes } from 'cozy-bar'

import App from './App'
import AppLayout from './AppLayout'
import ContactImportationModal from './ContactImportationModal'
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal'
import CreateModal from './Modals/ContactFormModal/CreateModal'
import EditModal from './Modals/ContactFormModal/EditModal'
import ContactInfoModal from './Modals/ContactInfoModal'
import GroupDeleteConfirmationModal from './Modals/GroupDeleteConfirmationModal'

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

const AppRouter = ({ withTopBar }) => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout withTopBar={withTopBar} />}>
          <Route path="/" element={<OutletWrapper Component={App} />}>
            <Route path="import" element={<ContactImportationModal />} />
            <Route path="new" element={<CreateModal />} />
            <Route path=":contactId" element={<ContactInfoModal />} />
            <Route path=":contactId/edit" element={<EditModal />} />
            <Route path=":contactId/delete" element={<ConfirmDeleteModal />} />
            <Route
              path="group/:groupId/delete/:groupName"
              element={<GroupDeleteConfirmationModal />}
            />
            {BarRoutes.map(BarRoute => BarRoute)}
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

AppRouter.defaultProps = {
  withTopBar: true
}

export default AppRouter
