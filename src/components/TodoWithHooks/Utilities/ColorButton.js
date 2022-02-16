import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const ColorButton = withStyles((theme) => ({
  root: {
    minWidth: "40px",
    padding: "6px 0px 4px",
    fontSize: "10px",
    maxHeight: "29px",
  },
}))(Button);
