import React from 'react'
import {
  Route,
  Outlet,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom'

import App from './App'
import AppLayout from './AppLayout'
import ContactImportationModal from './ContactImportationModal'
import { loader as loaderContentWrapper } from './ContentWrapper'
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

const AppRouter = client => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<OutletWrapper Component={App} />}
          loader={loaderContentWrapper(client)}
        >
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
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default AppRouter
