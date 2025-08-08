'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { toggleTheme } from '../store/slices/themeSlice'

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <div style={{
      backgroundColor: mode === 'light' ? '#f5f5f5' : '#333',
      color: mode === 'light' ? '#000' : '#fff',
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '8px'
    }}>
      <h2>Current Theme: {mode}</h2>
      <button onClick={handleToggle}>
        Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
     
    </div>
  )
}

export default ThemeSwitcher
