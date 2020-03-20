import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreenContainer from "../Features/SearchScreen";

const AppNavigator = createStackNavigator({
  SearchScreen: SearchScreenContainer
});

export default createAppContainer(AppNavigator);
