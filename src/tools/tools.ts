import { СontactProps } from "../types/СontactDataType";

export const removeDuplicates = (arr: СontactProps[]) => {
  const buffer = new Set();
  let prevLength = 0;
  return arr.reduce((acc, e: any) => {
    buffer.add(e.id);
    if (buffer.size > prevLength) {
      prevLength = buffer.size;
      return acc.concat(e);
    }
    return acc;
  }, []);
};
