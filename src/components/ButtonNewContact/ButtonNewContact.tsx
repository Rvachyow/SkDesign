import style from "./ButtonNewContact.module.scss";
import { Modal } from "../Modal/Modal";
import { useState } from "react";

export const ButtonNewContact = () => {
  const [activeModal, setActiveModal] = useState(false);
  const handleActiveModal = () => {
    setActiveModal(!activeModal);
  };

  return (
    <>
      {activeModal ? (
        <Modal setActiveModal={setActiveModal} activeModal={activeModal} />
      ) : (null)}
      <button onClick={handleActiveModal} className={style.addlist}>
        Add list
      </button>
    </>
  );
};
