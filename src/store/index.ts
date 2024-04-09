// store/index.ts
import { createStore, combineReducers } from 'redux';
import mediaReducer from './reducers/mediaReducers';

const rootReducer = combineReducers({
  media: mediaReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
