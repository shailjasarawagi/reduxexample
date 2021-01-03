import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore ,combineReducers ,compose}  from 'redux';
import counterReducer from './store/reducer/counter';
import  resultReducer  from './store/reducer/result';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    ctr:counterReducer,
    res:resultReducer
})

const logger= store=>{
    return next=> {
        return action=>{
        console.log('[middleware] dispatching',action );
        const result= next(action);
        console.log('[middleware] nextState', store.getState() );
        return result;
    }
}  
}

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
