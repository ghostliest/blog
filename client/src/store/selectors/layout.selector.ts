import { RootState } from "@store/reducers";
import { createSelector } from "reselect";

const headerHeight = ({
  client: {
    layout: { header },
  },
}: RootState) => header.height;

const authorsTopHeight = ({
  client: {
    layout: { authorsTop },
  },
}: RootState) => authorsTop.height;

export const selectLayoutHeaderHeight = createSelector(headerHeight, (v) => v);
export const selectLayoutAuthorsTopHeight = createSelector(authorsTopHeight, (v) => v);
