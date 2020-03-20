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

const FlatListContainer = props => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = React.useState(true);

  const fetchData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      props.incrementPage();

      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <FlatList
      style={{ marginBottom: 50 }}
      onMomentumScrollBegin={() => {
        setOnEndReachedCalledDuringMomentum(false);
      }}
      onEndReachedThreshold={0.01}
      onEndReached={() => fetchData()}
      data={props.data}
      keyExtractor={item => {
        return item.imdbID;
      }}
      renderItem={ListItem}
    />
  );
};

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
    </View>
  );
};

export default FlatListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
