import React from "react";
import { SafeAreaView } from "react-native";
import SearchScreen from "./src/Features/SearchScreen";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SearchScreen />
      </SafeAreaView>
    );
  }
}
