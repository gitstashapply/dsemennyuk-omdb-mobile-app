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
import { TouchableOpacity } from "react-native-gesture-handler";

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
      renderItem={item => (
        <ListItem navigation={props.navigation} item={item.item} />
      )}
    />
  );
};

const ListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          routeName: "DetailedScreen",
          params: {
            id: item.imdbID,
            title: item.Title
          }
        });
      }}
      style={styles.item}
    >
      <Text style={styles.title}>{item.Title}</Text>
    </TouchableOpacity>
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
