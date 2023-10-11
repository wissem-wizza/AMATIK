import { Fragment } from 'react';

import { Routing } from './components/Routing';
import { GlobalStyle } from './Global.style';


function App() {

  return (
    <Fragment>
      <Routing/>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
