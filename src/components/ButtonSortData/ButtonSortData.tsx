import style from "./ButtonSortData.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { sortBy } from "../../redux/slices/contactSlice";
import { SortProps } from "../../types/sortBtn";
import clsx from "clsx";

export const ButtonSortData = ({
  name,
  active,
  setTargetFilter,
}: SortProps & {
  active: boolean;
  setTargetFilter: Function;
}) => {
  const [activeSort, setActiveSort] = useState(false);
  const dispatch = useAppDispatch();
  const sortHandle = () => {
    dispatch(sortBy({ sortType: name }));
    setTargetFilter(name);
    setActiveSort(!activeSort);
  };
  return (
    <th
      className={clsx(style.sortbtn, { [style.acitveTh]: active })}
      onClick={sortHandle}
    >
      <div className={style.container}>
        {name}
        <div className={clsx(style.triangle, { [style.active]: activeSort })}></div>
      </div>
    </th>
  );
};
