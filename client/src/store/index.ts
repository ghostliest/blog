import { legacy_createStore as createStore, Store } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createWrapper } from "next-redux-wrapper";
import { reducer, RootState } from "./reducers";

// TODO
// @ts-ignore
export const store = (initialState = {}) => createStore(reducer, initialState, composeWithDevTools());

export const wrapper = createWrapper<Store<RootState>>(store, { debug: true });
