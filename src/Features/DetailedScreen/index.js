import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import Api from "../../Services/Api";
import { movie } from "../../../mockData";

export default class DetailedScreenContainer extends PureComponent {
  state = {
    data: undefined,
  };

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: title,
    };
  };

  componentDidMount = async () => {
    const { id } = this.props.navigation.state.params;
    const data = await Api.getMovieById(id);
    this.setState({
      data: data,
    });
  };

  render() {
    const { data } = this.state;

    if (!this.state.data) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#FFF" }}>
        <View>
          <Image
            style={{
              height: Dimensions.get("screen").height * 0.4,
              width: "100%",
              resizeMode: "contain",
            }}
            source={{ uri: `${data.Poster}` }}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <Text style={styles.title}>{data.Title}</Text>
            <Text>{`(${data.Year})`}</Text>
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text
              style={styles.subtitle}
            >{`Rated: ${data.Rated}, ${data.Runtime}`}</Text>
          </View>
          <View>
            <Text>{data.Plot}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    color: "black",
    fontSize: 12,
    fontWeight: "300",
  },
});
