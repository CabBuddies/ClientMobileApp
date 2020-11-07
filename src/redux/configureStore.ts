import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import Reactotron from "../../dev/ReactotronConfig";
export default function configureStore() {
  // we can add multiple middlewares here
  const middleWareEnhancer = applyMiddleware(thunk);
  // we combine all the enhancers here
  const enhancers = compose(middleWareEnhancer,Reactotron.createEnhancer!());
   
  return createStore(rootReducer,enhancers);
}
