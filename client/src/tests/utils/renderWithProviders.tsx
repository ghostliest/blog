import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store as createStore } from "@store";
import { RootState } from "@store/reducers";

export const renderWithProviders = (component: JSX.Element, initialState: RootState) => {
  const store = createStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
