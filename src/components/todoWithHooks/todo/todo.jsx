import React, { useState } from "react";
import "./Todo.css";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Error from "../Alert/Error";
import { ColorButton } from "../Utilities/ColorButton";
import EditTask from "../Edit/EditTask";

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
    tempTasks[index].isDone = !tempTasks[index].isDone;
    setTasks(tempTasks);
  };

  const checkTask = (index) => {
    let tempTasks = [...tasks];
    tempTasks[index].isChecked = !tempTasks[index].isChecked;
    setTasks(tempTasks);
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
  const handleEditCallback = (child) => {
    setEditMode(false);
    setError(child);
  };

  return (
    <div className="container">
      <form className="centerContainer">
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
      <div className="deleteButtons">
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
          <EditTask
            editValue={editValue}
            handleChange={setEditValue}
            editTask={editTask}
            handleEdit={handleEditCallback}
          />
        )}
        <div>
          {error && (
            <Error error={error} setParentError={handleErrorCallback} />
          )}
        </div>
      </div>
      <ul>
        {tasks.map((task, index) => (
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
