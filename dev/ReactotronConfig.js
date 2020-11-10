import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
      host: "10.0.0.3",
      name: "CabBuddies"
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) 
  .connect();

export default reactotron