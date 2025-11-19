import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import TicTacToe from './components/TicTacToe'
import './App.css'

function App() {
  useEffect(() => {
    // Signal to Farcaster that the app is ready
    try {
      sdk.actions.ready()
    } catch (error) {
      // SDK might not be available in local development
      console.log('Farcaster SDK not available (local development mode)')
    }
  }, [])

  return (
    <div className="app">
      <TicTacToe />
    </div>
  )
}

export default App

