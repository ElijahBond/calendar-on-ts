import { useState } from 'react'

import './App.scss'

import { Calendar } from './components/Calendar/Calendar'



export const App: React.FC = () => {
  const [selectedDate, selectDate] = useState(new Date())


  return (
    <div className="app__container">
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  )
}



export default App