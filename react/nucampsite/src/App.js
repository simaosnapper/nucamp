import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';

const store = configureStore();

class App extends Component {
    render() {
        return (
          <Provider store={store}>
            <BrowserRouter>
              <div className="App">
                  <Main />
              </div>
            </BrowserRouter>
          </Provider>
        );
    };
}

export default App;
