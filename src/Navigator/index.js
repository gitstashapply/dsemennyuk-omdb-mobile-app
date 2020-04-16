import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreenContainer from "../Features/SearchScreen";
import DetailedScreenContainer from "../Features/DetailedScreen";

const AppNavigator = createStackNavigator(
  {
    SearchScreen: SearchScreenContainer,
    DetailedScreen: DetailedScreenContainer,
  },
  {
    initialRouteName: "SearchScreen",
  }
);

export default createAppContainer(AppNavigator);
