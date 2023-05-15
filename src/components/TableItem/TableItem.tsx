import { СontactProps } from "../../types/СontactDataType";
import { useState } from "react";
import style from "./TableItem.module.scss";

export const TableItem = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  description,
  address,
}: СontactProps) => {
  const [activeDescription, setActiveDescription] = useState(false);

  const handleActiveDescription = () => {
    setActiveDescription(!activeDescription);
  };

  return (
    <>
    <tr onClick={handleActiveDescription} className={style.tableitem}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
    {activeDescription? <tr className={style.description}>
      <td>description:{description}</td>
      <td>streetAddress:{address?.streetAddress}</td>
      <td>city:{address?.city}</td>
      <td>state:{address?.state}</td>
      <td>zip:{address?.zip}</td>
    </tr> : null}
    </>
  );
};
