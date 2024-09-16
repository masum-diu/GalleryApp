import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store"; // Make sure this path is correct

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
