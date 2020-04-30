import React, { useState, useEffect } from "react";
import "../../static/css/global.css";
import "./styles.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Tags from "../../components/Tags";
import { useHistory } from "react-router-dom";
import api from "./../../services/api";
import SimpleReactValidator from "simple-react-validator";

function Caso(props) {
  SimpleReactValidator.addLocale("pt", {
    required: "O campo :attribute é obrigatório.",
    max: "O campo :attribute deve ter no máximo :max caracteres.",
    min: "O campo :attribute deve ter no mínimo :max caracteres.",
  });

  const [validator] = React.useState(
    new SimpleReactValidator({ autoForceUpdate: this, locale: "pt" })
  );
  const [, forceUpdate] = useState();
  const history = useHistory();
  const [id, setId] = useState();
  const [pasta, setPasta] = useState("");
  const [clientes, setClientes] = useState();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [acesso, setAcesso] = useState("Público");
  const [etiqueta, setEtiqueta] = useState([]);
  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.match.params.id && props.match.params.id !== "new") {
      getData(props.match.params.id && props.match.params.id);
    } else {
      setLoading(false);
      setValidation(true);
    }
  }, []);

  useEffect(() => {
    if (validation) {
      validator.showMessageFor("clientes");
    }
  }, [clientes]);

  useEffect(() => {
    if (validation) {
      validator.showMessageFor("pasta");
    }
  }, [pasta]);

  useEffect(() => {
    if (validation) {
      validator.showMessageFor("titulo");
    }
  }, [titulo]);

  useEffect(() => {
    if (validation) {
      validator.showMessageFor("responsavel");
    }
  }, [responsavel]);

  async function getData(id) {
    const response = await api.get(`/viewcaso?id=${id}`);
    var data = response.data;
    if (data && data.length > 0) {
      data = data[0];
      var etiquetas = [];
      data.etiqueta.forEach((item) => {
        etiquetas.push(item.cor.replace("Etiqueta(cor=", "").replace(")", ""));
      });
      setId(data.id);
      setPasta(data.pasta);
      setClientes(data.clientes);
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setObservacoes(data.observacoes);
      setResponsavel(data.responsavel);
      setAcesso(data.acesso);
      setEtiqueta(etiquetas);
      setValidation(true);
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    var etiquetas = [];
    etiqueta.forEach((item) => {
      etiquetas.push({ cor: item });
    });
    e.preventDefault();
    if (validator.allValid()) {
      const response = await api.post("/caso", {
        id,
        pasta,
        clientes,
        titulo,
        descricao,
        observacoes,
        responsavel,
        acesso,
        etiqueta: etiquetas,
      });
      history.push("/");
    } else {
      validator.showMessages();
      forceUpdate(1);
    }
  }

  return (
    <>
      <div className="container">
        {props.match.params.id == "new" ? <>Novo Caso</> : <>Edição de Caso</>}
        {!loading ? (
          <form autoComplete="off">
            <div className="input-block pastaandcategorias-inputs">
              <div className="input-pasta">
                <FormControl fullWidth>
                  <TextField
                    id="pasta"
                    name="pasta"
                    label="Pasta"
                    value={pasta}
                    onChange={(e) => setPasta(e.target.value)}
                  />
                </FormControl>
              </div>
              <div className="input-categorias">
                <FormControl fullWidth>
                  <Tags tags={etiqueta} setTags={setEtiqueta} from={"caso"} />
                </FormControl>
              </div>
            </div>
            <span className="validation">
              {validator.message("pasta", pasta, "max:40")}
            </span>
            <div className="input-block">
              <FormControl fullWidth>
                <TextField
                  id="clientes"
                  name="clientes"
                  label="Clientes"
                  value={clientes}
                  onChange={(e) => setClientes(e.target.value)}
                  required
                />
                <span className="validation">
                  {validator.message("clientes", clientes, "required")}
                </span>
              </FormControl>
            </div>
            <div className="input-block">
              <FormControl fullWidth>
                <TextField
                  id="titulo"
                  name="titulo"
                  label="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <span className="validation">
                  {validator.message("titulo", titulo, "required")}
                </span>
              </FormControl>
            </div>
            <div className="input-block">
              <FormControl fullWidth>
                <TextField
                  id="descricao"
                  label="Descrição"
                  multiline
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormControl>
            </div>
            <div className="input-block">
              <FormControl fullWidth>
                <TextField
                  id="observacoes"
                  label="Observações"
                  multiline
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </FormControl>
            </div>
            <div className="input-block">
              <FormControl fullWidth>
                <TextField
                  id="resposavel"
                  name="responsavel"
                  label="Resposável"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  required
                />
                <span className="validation">
                  {validator.message("responsavel", responsavel, "required")}
                </span>
              </FormControl>
            </div>
            <div className="input-block">
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-select">Acesso</InputLabel>
                <Select
                  defaultValue={"Público"}
                  id="grouped-select"
                  value={acesso ? acesso : "Público"}
                  onChange={(e) => setAcesso(e.target.value)}
                >
                  <MenuItem value={"Público"}>Público</MenuItem>
                  <MenuItem value={"Privado"}>Privado</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="buttons-block">
              <div className="button-save">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
              </div>

              <Button variant="contained" onClick={() => history.push("/")}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="loading">
            <div class="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Caso;
