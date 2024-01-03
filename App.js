import React from "react";
import { Provider } from 'react-redux';
import Navigation from "./src/navigators/navigation"
import { store } from "./src/store";
import { en, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', en)

export default function App () {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

