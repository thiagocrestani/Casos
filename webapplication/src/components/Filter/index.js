import React, { useState } from "react";
import "../../static/css/global.css";
import "./styles.css";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Tags from "../Tags";
import { useHistory } from "react-router-dom";

function Filters({ setFilter, search, setSearch }) {
  const history = useHistory();
  const [filterType, setFilterType] = useState("Clientes");
  const [etiqueta, setEtiqueta] = useState([]);
  const [clientes, setClientes] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdUp, setCreatedUp] = useState("");
  const [acesso, setAcesso] = useState("Público");

  function handleSubmit(e) {
    e.preventDefault();
    var valueFilter = "";
    if (filterType === "Clientes") {
      valueFilter = [clientes];
    } else if (filterType === "Etiqueta") {
      valueFilter = etiqueta;
    } else if (filterType === "Data") {
      valueFilter = [createdFrom, createdUp];
    } else if (filterType === "Acesso") {
      valueFilter = [acesso];
    }
    setFilter({
      filterType,
      filter: valueFilter,
    });
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <div className="filter-block">
          <div className="title-filter">Filtros</div>
          <div className="input-block inputs-filter">
            <div className="input-type">
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-select">Tipo do Filtro</InputLabel>
                <Select
                  defaultValue="Clientes"
                  id="grouped-select"
                  value={filterType ? filterType : "Clientes"}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value={"Clientes"}>Clientes</MenuItem>
                  <MenuItem value={"Etiqueta"}>Etiqueta</MenuItem>
                  <MenuItem value={"Data"}>Data criação</MenuItem>
                  <MenuItem value={"Acesso"}>Acesso</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="input-filter-by-type">
              {filterType === "Etiqueta" ? (
                <FormControl fullWidth>
                  <Tags tags={etiqueta} setTags={setEtiqueta} from={"filter"} />
                </FormControl>
              ) : filterType === "Data" ? (
                <FormControl fullWidth>
                  <div className="date-block">
                    <div className="date-left">
                      <TextField
                        id="date"
                        className="date-input"
                        label="Cadastrado a partir de"
                        type="date"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={createdFrom}
                        onChange={(e) => setCreatedFrom(e.target.value)}
                      />
                    </div>
                    <div className="date-right">
                      <TextField
                        id="date"
                        className="date-input"
                        label="Cadastrado até"
                        type="date"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={createdUp}
                        onChange={(e) => setCreatedUp(e.target.value)}
                      />
                    </div>
                  </div>
                </FormControl>
              ) : filterType === "Acesso" ? (
                <FormControl fullWidth>
                  <InputLabel htmlFor="grouped-select">Acesso</InputLabel>
                  <Select
                    defaultValue="Público"
                    id="grouped-select"
                    value={acesso ? acesso : "Público"}
                    onChange={(e) => setAcesso(e.target.value)}
                  >
                    <MenuItem value={"Público"}>Público</MenuItem>
                    <MenuItem value={"Privado"}>Privado</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <TextField
                    id="clientes"
                    label="Clientes"
                    size="small"
                    value={clientes}
                    onChange={(e) => setClientes(e.target.value)}
                  />
                </FormControl>
              )}
            </div>
          </div>
          <div className="input-block buttoms-block">
            <div className="new-caso-buttom">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/caso/new")}
              >
                Incluir Novo Caso
              </Button>
            </div>

            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Filtrar
            </Button>
          </div>
        </div>
      </form>

      <form noValidate autoComplete="off" className="search">
        <FormControl fullWidth>
          <Paper component="form" className="find-root">
            <InputBase
              className="find-input"
              placeholder="Busque na lista por pasta, título ou descrição"
              inputProps={{
                "aria-label": "Busque na lista por pasta, título ou descrição",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="button"
              className="find-icon-button"
              aria-label="search"
              onClick={(e) => {
                e.preventDefault();
                setSearch("");
              }}
            >
              <ClearIcon />
            </IconButton>

            <IconButton
              type="buttom"
              className="find-icon-button"
              aria-label="search"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </FormControl>
      </form>
    </>
  );
}

export default Filters;
