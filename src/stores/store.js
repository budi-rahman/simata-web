import Thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal"],
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const persistedReducer = persistReducer(persistConfig, reducers);

const storeReducer = createStore(persistedReducer, composeEnhancers(applyMiddleware(Thunk)));

export default { store: storeReducer, persistor: persistStore(storeReducer) };
