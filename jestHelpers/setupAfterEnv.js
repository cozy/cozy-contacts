import '@testing-library/jest-dom'
import React from 'react'

jest.mock('cozy-bar', () => ({
  BarComponent: () => <div>Bar</div>,
  BarLeft: ({ children }) => children,
  BarRight: ({ children }) => children,
  BarCenter: ({ children }) => children,
  BarSearch: ({ children }) => children
}))
