import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import style from "./Modal.module.scss";
import { useAppDispatch } from "../../redux/hook";
import { createList } from "../../redux/slices/contactSlice";

const portal = document.getElementById("portal") as HTMLElement;
export const Modal = ({
  activeModal,
  setActiveModal,
}: {
  activeModal: boolean;
  setActiveModal: (arg: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = (value: any) => {
    dispatch(createList({ value }));
    reset();
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  if (!activeModal) return null;

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div onClick={closeModal} className={style.bg}></div>
      <div className={style.modal_container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.newConctact}>
          <input
            type="number"
            {...register("id", { required: "id" })}
            placeholder="id"
          />
          <input
            autoComplete="off"
            {...register("firstName", { required: "firstName" })}
            placeholder="firstName"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("lastName", { required: "lastName" })}
            placeholder="lastName"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("email", { required: "email" })}
            placeholder="email"
            type="text"
          />
          <input
            autoComplete="off"
            {...register("phone", { required: "phone" })}
            placeholder="phone"
            type="text"
          />
          <div className={style.btn}></div>
          <div className={style.line}></div>
          <button disabled={!formState.isValid} className={style.createbtn}>
            Creat
          </button>
        </form>
      </div>
    </div>,
    portal,
  );
};
