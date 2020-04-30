import React, { useEffect, useState } from "react";
import "../../static/css/global.css";
import Filter from "../../components/Filter";
import List from "../../components/List";
import Popup from "../../components/Popup";
import api from "./../../services/api";

function Main(props) {
  const [listItems, setListItems] = useState([]);
  const [listItemsResponse, setListItemsResponse] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [contentPopup, setContentPopup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listData(page - 1);
  }, []);

  useEffect(() => {
    if (page > 0) {
      listData(page - 1);
    }
  }, [page]);

  useEffect(() => {
    if (search === "") {
      setListItems(listItemsResponse);
    } else {
      filterData(null);
    }
  }, [search]);

  useEffect(() => {
    if (page != 1) {
      setPage(1);
    } else {
      listData(page - 1);
    }
  }, [filter]);

  function filterData(data) {
    if (data == null) {
      data = listItemsResponse;
    }
    setListItems(
      data.filter(
        (el) =>
          el.pasta.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          el.titulo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          el.descricao.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );
  }

  async function listData(page) {
    var parameters = `page=${page}&size=20`;
    console.log(filter);
    if (filter !== 0) {
      var filters = `${filter.filter.map(
        (etiquetaItem) => `&filter=${etiquetaItem}`
      )}`;
      if (filter.filterType === "Etiqueta" || filter.filterType === "Data") {
        filters = filters.replace(",", "");
      }
      parameters = parameters + `&filterType=${filter.filterType}${filters}`;

      //parameters = parameters + `&pasta=${filter.pasta}&clientes=${filter.clientes}${tags.replace(",","")}&createdFrom=${filter.createdFrom}&createdUp=${filter.createdUp}&acesso=${filter.acesso}`
    }
    console.log(parameters);
    const response = await api.get("/casos?" + parameters);
    setListItemsResponse(response.data.casos);
    if (search === "") {
      setListItems(response.data.casos);
    } else {
      filterData(response.data.casos);
    }
    setTotalPages(response.data.totalPages);
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <Filter setFilter={setFilter} search={search} setSearch={setSearch} />
        {!loading ? (
          <List
            listItems={listItems}
            setShowPopup={setShowPopup}
            setContentPopup={setContentPopup}
            totalPages={totalPages}
            setPage={setPage}
            page={page}
          />
        ) : (
          <div className="loading">
            <div class="loader"></div>
          </div>
        )}
        {showPopup ? (
          <Popup content={contentPopup} setVisible={setShowPopup} />
        ) : null}
      </div>
    </>
  );
}

export default Main;
