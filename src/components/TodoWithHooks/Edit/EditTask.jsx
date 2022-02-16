import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

export default function EditTask(props) {
  const handleClose = () => {
    props.handleEdit("");
  };

  return (
    <div className="centerContainer">
      <Input
        type="text"
        value={props.editValue}
        onChange={(e) => props.handleChange(e.target.value)}
      />
      <Button onClick={props.editTask}>Edit</Button>
      <Button onClick={handleClose}>Cancel</Button>
    </div>
  );
}
