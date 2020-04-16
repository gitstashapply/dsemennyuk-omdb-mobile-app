import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { search } from "../../../mockData";
import Api from "../../Services/Api";
import FlatListContainer from "./FlatListContainer";

export default class SearchScreenContainer extends React.Component {
  state = {
    currentPage: 1,
    textInputValue: "",
    data: undefined,
  };

  static navigationOptions = () => {
    return {
      title: "Search",
    };
  };

  incrementPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.textInputValue !== this.state.textInputValue &&
      this.state.textInputValue.length > 3
    ) {
      const res = await Api.getMovies({
        inputValue: this.state.textInputValue,
        page: this.state.currentPage,
      });
      this.setState({
        data: res.data,
      });
    }

    if (
      this.state.currentPage !== prevState.currentPage &&
      this.state.currentPage > prevState.currentPage
    ) {
      const res = await Api.getMovies({
        inputValue: this.state.textInputValue,
        page: this.state.currentPage,
      });

      this.setState({
        data: [...this.state.data, ...res.data],
      });
    }
  };

  onTextInputValueChange = (event) => {
    this.setState({
      textInputValue: event.nativeEvent.text,
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <>
            <TextInput
              placeholder={"Search..."}
              style={{
                padding: 4,
                height: 40,
                width: "100%",
                borderColor: "gray",
                borderBottomWidth: 1,
                marginBottom: 8,
              }}
              value={this.state.textInputValue}
              onChange={this.onTextInputValueChange}
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <FlatListContainer
                navigation={this.props.navigation}
                data={this.state.data}
                incrementPage={this.incrementPage}
                currentPage={this.state.currentPage}
              />
            </TouchableWithoutFeedback>
          </>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  item: {
    height: 60,
    width: 300,
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: "black",
    fontSize: 12,
  },
});
