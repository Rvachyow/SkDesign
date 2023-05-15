import { useAppDispatch } from "../../redux/hook";
import { getContacts } from "../../redux/slices/contactSlice";
import { ButtonNewContact } from "../ButtonNewContact/ButtonNewContact";
import style from "./ButtonChangeData.module.scss";

export const ButtonChangeData = () => {
  const dispatch = useAppDispatch();
  const handleGetData = (version: string) => {
    dispatch(getContacts(version));
  };

  return (
    <div className={style.AddContact}>
      <ButtonNewContact/>
      <button onClick={() => handleGetData("full")}>Полный список</button>
      <button onClick={() => handleGetData("short")}>Короткий</button>
    </div>
  );
};
