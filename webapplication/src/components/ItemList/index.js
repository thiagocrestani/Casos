import React from "react";
import "../../static/css/global.css";
import "./styles.css";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

function ItemList({ item, setShowPopup, setContentPopup }) {
  const history = useHistory();

  return (
    <>
      <tr className="line">
        <td className="itemLine column-pasta">
          {item.pasta}
          {item.etiqueta && item.etiqueta.length > 0 ? (
            item.etiqueta.map((etiquetaItem) => (
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
        </td>
        <td className="itemLine">{item.clientes}</td>
        <td className="itemLine secundary-item">{item.titulo}</td>
        <td className="itemLine secundary-item">{item.responsavel}</td>
        <td className="itemLine secundary-item">{item.acesso}</td>
        <td className="itemLine">
          <div className="buttom-icons">
            <IconButton
              aria-label="view"
              onClick={() => {
                setContentPopup(item);
                setShowPopup(true);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => history.push(`/caso/${item.id}`)}
            >
              <EditIcon />
            </IconButton>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ItemList;
