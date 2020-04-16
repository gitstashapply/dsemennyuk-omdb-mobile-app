import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FlatListContainer = (props) => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = React.useState(true);

  const fetchData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      props.incrementPage();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <FlatList
      onMomentumScrollBegin={() => {
        setOnEndReachedCalledDuringMomentum(false);
      }}
      onEndReachedThreshold={0.01}
      onEndReached={() => fetchData()}
      data={props.data}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      renderItem={(item) => (
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
            title: item.Title,
          },
        });
      }}
      style={styles.item}
    >
      <View style={{ maxWidth: "80%" }}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{`${item.Type} ${item.Year}`}</Text>
      </View>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: `${item.Poster}` }}
      />
    </TouchableOpacity>
  );
};

export default FlatListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    height: 80,
    width: Dimensions.get("screen").width * 0.9,
    padding: 8,
    backgroundColor: "#f9c2ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "300",
  },
});
