import { PostNavigationType } from "@store/types/cms.types";

export interface INav {
  header: string;
  type: PostNavigationType;
  count: number;
  active: boolean;
}
