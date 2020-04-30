import React from "react";
import "../../static/css/global.css";
import "./styles.css";
import Button from "@material-ui/core/Button";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";

function Popup({ content, setVisible }) {
  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          Detalhes Caso
          <div className="label">Pasta</div>
          <div className="block-infos">
            <div className="text">{content.pasta}</div>
            {content.etiqueta && content.etiqueta.length > 0 ? (
              content.etiqueta.map((etiquetaItem) => (
                <div
                  className="tag-list"
                  id={`${etiquetaItem.cor
                    .replace("Etiqueta(cor=", "")
                    .replace(")", "")}-tag`}
                >
                  {" "}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="label">Clientes</div>
          <div className="text">{content.clientes}</div>
          <div className="label">Título</div>
          <div className="text">{content.titulo}</div>
          <div className="label">Descrição </div>
          <div className="text">{content.descricao}</div>
          <div className="label">Observações</div>
          <div className="text">{content.observacoes}</div>
          <div className="label">Responsável</div>
          <div className="text">{content.responsavel}</div>
          <div className="block-infos">
            <div>
              <div className="label">Acesso</div>
              <div className="text">{content.acesso}</div>
            </div>
            <div className="creationDate">
              <div className="label">Data de Criação</div>
              <div className="text">
                {format(parseISO(content.creationDate), "dd/MM/yyyy")}
              </div>
            </div>
          </div>
          <div className="popup-buttom">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setVisible(false);
              }}
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
