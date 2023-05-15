import style from "./Tables.module.scss";
import { TableItem } from "../TableItem/TableItem";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { СontactProps } from "../../types/СontactDataType";
import { ButtonSortData } from "../ButtonSortData/ButtonSortData";
import { SORT_BTN } from "../../constants/sortBtnConstant";
import { ButtonChangeData } from "../ButtonChangeData/ButtonChangeData";
import { useState, useEffect } from "react";
import { filterBy } from "../../redux/slices/contactSlice";
import { Pagination } from "../Pagination/Pagination";

export const Tables = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 50;
  const [searchInput, setSearchInput] = useState<string>("");
  const [targetFilter, setTargetFilter] = useState<keyof СontactProps>("id");

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const dispatch = useAppDispatch();
  const { filtred, status } = useAppSelector((state) => state.contact);
  const currentRecords = filtred.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleClearInput = () => {
    setSearchInput("");
  };
  useEffect(() => {
    dispatch(filterBy({ filterBy: targetFilter, input: searchInput }));
  }, [searchInput]);

  return (
    <div className={style.tables}>
      <div className={style.container}>
        <div className={style.tables__filter}>
          <div className={style.tables__search}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={`Поиск по ${targetFilter}`}
              type="text"
            />
            {searchInput ? (
              <img
                onClick={handleClearInput}
                className={style.closeBtn}
                width={10}
                height={10}
                src="./assets/x.svg"
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <Pagination
            recordsPerPage={recordsPerPage}
            onChangePage={(num: number) => setCurrentPage(num)}
          />
          <ButtonChangeData />
        </div>
        {status === "loading" ? (
          <div>loading</div>
        ) : (
          <div className={style.tables__table}>
            <table>
              <thead>
                <tr className={style.table__tr}>
                  {SORT_BTN?.map((item) => (
                    <ButtonSortData
                      key={item.path}
                      active={targetFilter === item.name}
                      setTargetFilter={setTargetFilter}
                      {...item}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRecords?.map((item: СontactProps) => (
                  <TableItem {...item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
