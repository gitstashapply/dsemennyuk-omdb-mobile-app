import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Api from "../../Services/Api";

export default class DetailedScreenContainer extends PureComponent {
  state = {
    data: undefined
  };

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: title
    };
  };

  componentDidMount = async () => {
    const { id } = this.props.navigation.state.params;
    const data = await Api.getMovieById(id);
    this.setState({
      data: data
    });
  };

  render() {
    if (!this.state.data) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
