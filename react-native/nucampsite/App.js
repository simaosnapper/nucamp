import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
import { YellowBox } from 'react-native';
import Main from './components/MainComponent';

const { persistor, store } = ConfigureStore();

YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<Loading />}
                persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
}