import { useAppSelector } from "../../redux/hook";
import style from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export const Pagination = ({
  onChangePage,
  recordsPerPage,
}: {
  onChangePage: (arg:number) => void;
  recordsPerPage: number;
}) => {
  const data = useAppSelector((state) => state.contact.filtred);

  return (
    <>
      <ReactPaginate
        className={style.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={recordsPerPage}
        pageCount={Math.ceil(data.length / 50)}
        // onPageActive={}
        previousLabel="<"
      />
    </>
  );
};
