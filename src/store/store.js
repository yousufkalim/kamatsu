import { combineReducers, createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { composeWithDevTools } from "redux-devtools-extension"

import unitReducer from "../container/app/redux/unit/reducers"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [""],
  timeout: null,
  blacklist: []
}

let rehydrationComplete
let rehydrationFailed

const rehydrationPromise = new Promise((resolve, reject) => {
  rehydrationComplete = resolve
  rehydrationFailed = reject
})

export function rehydration() {
  return rehydrationPromise
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    unitState: unitReducer
  })
)

const store = createStore(persistedReducer, undefined, composeWithDevTools())

const persistor = persistStore(store, null, () => {
  // this will be invoked after rehydration is complete
  console.log("done")
  rehydrationComplete()
})

export { store, persistor }
