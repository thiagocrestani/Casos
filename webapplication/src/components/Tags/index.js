import React, { useEffect } from "react";
import "../../static/css/global.css";
import "./styles.css";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Vermelho",
  "Amarelo",
  "Azul",
  "Rosa",
  "Roxo",
  "Laranja",
  "Verde",
];

function getStyles(name, color, theme) {
  return {
    fontWeight:
      color.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Tags({ setTags, tags, from }) {
  const classes = useStyles();
  const theme = useTheme();
  const [color, setcolor] = React.useState(tags);

  useEffect(() => {
    setcolor(tags);
  }, [tags]);

  const handleChange = (event) => {
    if (from === "filter") {
      var valueArr = [];
      if (event.target.value.length > 1) {
        valueArr = [event.target.value[1]];
      } else {
        valueArr = event.target.value;
      }
      setcolor(valueArr);
      setTags(valueArr);
    } else {
      setcolor(event.target.value);
      setTags(event.target.value);
    }
  };

  return (
    <>
      <InputLabel id="categorias-label">
        {from === "filter" ? <>Etiqueta</> : <>Etiquetas</>}
      </InputLabel>
      <Select
        labelId="categorias-label"
        id="categorias-chip"
        multiple
        value={color}
        onChange={handleChange}
        input={<Input id="categorias-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={""}
                className={classes.chip}
                id={`${value}-tag`}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, color, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default Tags;
