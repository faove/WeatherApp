import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import Weather from './src/components/Weather.jsx';

const App = () => {

  return (
    <Provider store={store}>
      <Weather/>
    </Provider>
  )
}

export default App;