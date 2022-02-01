import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./todo.css";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Error from "../alert/error";

const styles = {
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  DeleteButtons: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "25px",
  },
  Container: {
    margin: "70px auto 10px",
    width: "700px",
  },
};
const ColorButton = withStyles((theme) => ({
  root: {
    minWidth: "40px",
    padding: "6px 0px 4px",
    fontSize: "10px",
    maxHeight: "29px",
  },
}))(Button);

export default function Todo() {
  const [id, setId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const isValidInput = (value) => {
    if (value === "") {
      setError(`You can't add an empty task!`);
      return false;
    } else if (tasks.some((task) => task.name === value)) {
      setError("Task already exists!");
      return false;
    }
    setError("");
    return true;
  };

  const addTask = (e) => {
    e.preventDefault();
    if (isValidInput(inputValue)) {
      setTasks([
        ...tasks,
        { id: id, name: inputValue, isDone: false, isChecked: false },
      ]);
      setId(id + 1);
      setInputValue("");
      setError("");
    }
  };

  const clearInputField = (e) => {
    e.preventDefault();
    setInputValue("");
    setError("");
  };

  const markAsDone = (index) => {
    let tempTasks = [...tasks];
    // let i = tempTasks.findIndex((el) => el.id === index);
    tempTasks[index].isDone = !tempTasks[index].isDone;
    setTasks(tempTasks);
    console.log(tasks[index].isDone);
  };

  const checkTask = (index) => {
    let tempTasks = [...tasks];
    // let i = tempTasks.findIndex((el) => el.id === index);
    tempTasks[index].isChecked = !tempTasks[index].isChecked;
    setTasks(tempTasks);
    console.log(tasks[index].isChecked);
  };


  const editTask = (e) => {
    const tempTasks = tasks.map((task, index) => {
      if (index === editTaskIndex && isValidInput(editValue)) {
        task.name = editValue;
      }
      return task;
    });
    setTasks(tempTasks);
    setEditMode(false);
  };

  const move = (index, add) => {
    let tempTasks = [...tasks];
    if (index === tempTasks.length - 1 && add === 1) {
      setError("No more way down!");
    } else if (index === 0 && add === -1) {
      setError("No more way up!");
    } else {
      let tmp = tempTasks[index];
      tempTasks[index] = tempTasks[index + add];
      tempTasks[index + add] = tmp;
      setTasks(tempTasks);
      setError("");
    }
  };

  const handleErrorCallback = (childError) => {
    setError(childError);
  };

  return (
    <div style={styles.Container}>
      <form style={styles.centerContainer}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: "400px" }}
        />
        <Button
          variant="contained"
          onClick={addTask}
          style={{
            backgroundColor: "#8BC34A",
            color: "white",
            marginLeft: "10px",
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={clearInputField}
          style={{
            backgroundColor: "#EF5350",
            color: "white",
            marginLeft: "10px",
          }}
        >
          Clear
        </Button>
      </form>
      <div style={styles.DeleteButtons}>
        <Button
          variant="contained"
          onClick={() => setTasks([])}
          style={{
            backgroundColor: "#EF5350",
            color: "white",
          }}
        >
          Delete All Tasks
        </Button>
        <Button
          variant="contained"
          onClick={() => setTasks(tasks.filter((el) => el.isDone === false))}
          style={{
            backgroundColor: "#EF5350",
            color: "white",
          }}
        >
          Delete Done tasks
        </Button>
        <Button
          variant="contained"
          onClick={() => setTasks(tasks.filter((el) => el.isChecked === false))}
          style={{
            backgroundColor: "#EF5350",
            color: "white",
          }}
        >
          Delete Checked Tasks
        </Button>
      </div>
      <div className="conditional">
        {editMode && (
          <div style={styles.centerContainer} className="popup">
            <Input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button onClick={editTask}>Edit</Button>
            <Button
              onClick={() => {
                setEditMode(false);
                setError("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {error && <Error error={error} setParentError={handleErrorCallback} />}
      </div>
      <ul>
        {tasks.map((task, index) => (
          // <div >
          <li key={"task" + index + id} className={task.isDone ? "done" : ""}>
            <div>
              <Checkbox
                type="checkbox"
                checked={task.isChecked}
                onChange={() => checkTask(index)}
              />
              {task.name}
            </div>

            <div className="btnWrapper">
              <ColorButton
                style={{
                  backgroundColor: "#EF5350",
                  color: "white",
                }}
                variant="contained"
                onClick={() => setTasks(tasks.filter((el, i) => i !== index))}
              >
                X
              </ColorButton>
              <ColorButton
                style={{
                  backgroundColor: "#8BC34A",
                  color: "white",
                }}
                variant="contained"
                onClick={markAsDone.bind(this, index)}
              >
                Done
              </ColorButton>
              <ColorButton
                style={{
                  backgroundColor: "#00BCD4",
                  color: "white",
                }}
                variant="contained"
                onClick={() => move(index, -1)}
              >
                ↑
              </ColorButton>
              <ColorButton
                style={{
                  backgroundColor: "#00BCD4",
                  color: "white",
                }}
                variant="contained"
                onClick={() => move(index, 1)}
              >
                ↓
              </ColorButton>
              <ColorButton
                style={{
                  backgroundColor: "#FFC107",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  setEditMode(true);
                  setEditValue(tasks[index].name);
                  setEditTaskIndex(index);
                }}
              >
                Edit
              </ColorButton>
            </div>
          </li>
          // </div>
        ))}
      </ul>
    </div>
  );
}
