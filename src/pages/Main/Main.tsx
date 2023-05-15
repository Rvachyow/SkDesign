import style from "./Main.module.scss";
import { Tables } from "../../components/Tables/Tables";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { getContacts } from "../../redux/slices/contactSlice";

export const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div className={style.main}>
      <Tables />
    </div>
  );
};
