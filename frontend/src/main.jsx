import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/userContext.jsx'
import { ChatsProvider } from './contexts/chatsContext.jsx'
import { VideoProvider } from './contexts/videoCallContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoProvider>
    <ChatsProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </ChatsProvider>
    </VideoProvider>
  </StrictMode>,
)
