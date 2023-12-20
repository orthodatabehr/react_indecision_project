
import React, {useContext} from 'react';
import { MyContext } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.css'

import Stage1 from './components/stage1';
import Stage2 from './components/stage2';



const App = () => {
  const context = useContext(MyContext)

  return(
    <div className='wrapper'>
      <div className='center-wrapper'>
        <h1>Where do you want to eat?</h1>
        {context.state.stage === 1 ?
          <Stage1 />
          :   
          <Stage2 />
        }

      </div>
    </div>
  )
}

export default App;