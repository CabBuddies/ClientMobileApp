import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import RootStackNavigator from "./src/navigations/RootNavigator";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Root } from "native-base";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./src/redux/configureStore";
if (__DEV__) {
  import('./dev/ReactotronConfig')
}
import Reactotron from 'reactotron-react-native';
import { applyLocalDefinitions } from "./src/api/api-definitions";
import { LogBox } from "react-native";
import RideScreen from "./src/screens/app-screens/RideScreen";

Reactotron.log!("Hello there!")

LogBox.ignoreAllLogs();
export default function App() {
  const store = configureStore();
  // reset api definitions on component mount
  useEffect(() => {
    applyLocalDefinitions();
  }, [])

  let [fontsLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    Signatra: require('./assets/Signatra.otf')
  });

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  return (

    (!fontsLoaded) ?
      (
        <Root>
          <AppLoading />
        </Root>
      )
      :
      (
        <Root>
          {/* <RideScreen /> */}
          <ReduxProvider store={store}>
            <PaperProvider theme={theme}>
              <RootStackNavigator />
            </PaperProvider>
          </ReduxProvider>
        </Root>
      )
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
