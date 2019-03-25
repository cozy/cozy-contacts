import React from 'react'

const GroupItem = ({ children, key }) => (
  <li
    key={key}
    className="u-dib u-slateGrey u-fz-small u-p-half u-mr-half u-w-auto u-maw-4 u-bg-paleGrey u-ellipsis"
  >
    {children}
  </li>
)

export default GroupItem
