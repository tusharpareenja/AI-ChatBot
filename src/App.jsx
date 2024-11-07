import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Chat_room from './Components/chat_room'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chat_room />
    </>
  )
}

export default App
