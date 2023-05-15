import { СontactProps } from "../types/СontactDataType";

export interface СontactDateTypes {
  data: СontactProps[] | [];
  filtred: СontactProps[] | [];
  status: "loading" | "loaded";
  isSorted: boolean;
}

