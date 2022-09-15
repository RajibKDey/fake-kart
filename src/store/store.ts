import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

export default function configureStore() {
  const middleWares = [thunkMiddleware]
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
  return store;
}
