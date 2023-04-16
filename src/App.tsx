import { useState } from 'react'

import { Calendar } from './components/Calendar/Calendar'
import { formatDate } from './utils/helpers/date'

import './App.scss'

export const App: React.FC = () => {
  const [selectedDate, selectDate] = useState(new Date())
  
  
  return (
    <div className="app__container">
      <div className='date__container'>{formatDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  )
}



export default App