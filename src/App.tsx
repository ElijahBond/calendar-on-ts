import { createMonth } from './utils/helpers/date/createMonth'
import { createYear } from './utils/helpers/date/createYear'

import './App.scss'

function App() {

  console.log('createDate', createYear({ locale: 'en-US' }).createYearMonthes())

  return (
    <div className="app__container">
      <h1>Calendar</h1>
    </div>
  )
}



export default App
