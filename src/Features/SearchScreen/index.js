import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { search } from "../../../mockData";
import Api from "../../Services/Api";
import FlatListContainer from "./FlatListContainer";

export default class SearchScreenContainer extends React.Component {
  state = {
    currentPage: 1,
    textInputValue: "",
    data: undefined
  };

  incrementPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.textInputValue !== this.state.textInputValue &&
      this.state.textInputValue.length > 3
    ) {
      const res = await Api.getMovies({
        inputValue: this.state.textInputValue,
        page: this.state.currentPage
      });
      this.setState({
        data: res.data
      });
    }

    if (
      this.state.currentPage !== prevState.currentPage &&
      this.state.currentPage > prevState.currentPage
    ) {
      console.log("Api call");
      const res = await Api.getMovies({
        inputValue: this.state.textInputValue,
        page: this.state.currentPage
      });

      this.setState({
        data: [...this.state.data, ...res.data]
      });
    }
  };

  onTextInputValueChange = event => {
    this.setState({
      textInputValue: event.nativeEvent.text
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderWidth: 1
            }}
            value={this.state.textInputValue}
            onChange={this.onTextInputValueChange}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <FlatListContainer
              data={this.state.data}
              incrementPage={this.incrementPage}
              currentPage={this.state.currentPage}
            />
          </TouchableWithoutFeedback>
        </>
      </View>
    );
  }
}

const ListItem = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: 60,
    width: 300,
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    color: "black",
    fontSize: 12
  }
});
