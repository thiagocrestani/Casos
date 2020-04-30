import React, { useEffect, useState } from "react";
import "../../static/css/global.css";
import "./styles.css";
import ItemList from "./../ItemList";
import Pagination from "@material-ui/lab/Pagination";

function List({
  listItems,
  setShowPopup,
  setContentPopup,
  totalPages,
  setPage,
  page,
}) {
  return listItems.length > 0 ? (
    <>
      <table className="list" cellSpacing="0">
        <tr className="head-list">
          <th className="head-item column-md">Pasta</th>
          <th className="head-item">Cliente</th>
          <th className="head-item column-md">Título</th>
          <th className="head-item column-md">Responsável</th>
          <th className="head-item column-sm">Acesso</th>
          <th className="head-item column-sm"></th>
        </tr>

        {listItems.map((item) => (
          <ItemList
            key={item.id}
            item={item}
            setShowPopup={setShowPopup}
            setContentPopup={setContentPopup}
          />
        ))}
      </table>
      <div className="pagination-content">
        <div className="pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </div>
      </div>
    </>
  ) : (
    <>Nenhum registro encontrado</>
  );
}

export default List;
