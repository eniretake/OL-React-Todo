import React, { Component } from "react";
import {
  withStyles,
} from "@material-ui/core/styles";
import "./todo.css";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Error from "../alert/error";
import EditTask from "../edit/editTask";

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

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputTaskValue: "",
      editTaskValue: "",
      editTaskIndex: -1,
      editMode: false,
      error: "",
    };
  }

  changeInput = (e) => {
    this.setState({ inputTaskValue: e.target.value });
  };

  isValidInput = (value) => {
    if (value === "") {
      this.setState({ error: `You can't add an empty task!` });
      return false;
    } else if (this.state.tasks.some((task) => task.name === value)) {
      this.setState({ error: "Task already exists!" });
      return false;
    }
    this.setState({ error: "" });
    return true;
  };

  addTask = (e) => {
    e.preventDefault();
    if (this.isValidInput(this.state.inputTaskValue)) {
      this.setState({
        tasks: [
          ...this.state.tasks,
          { name: this.state.inputTaskValue, isDone: false, isChecked: false },
        ],
        inputTaskValue: "",
        error: "",
      });
    }
  };

  clearInputField = (e) => {
    e.preventDefault();
    this.setState({
      inputTaskValue: "",
      error: "",
    });
  };

  removeTask = (index) => {
    // e.preventDefault();
    this.setState({
      tasks: this.state.tasks.filter((el, i) => i !== index),
    });
  };

  markAsDone = (index) => {
    let tempTasks = this.state.tasks.slice();
    tempTasks[index].isDone = !tempTasks[index].isDone;
    this.setState({
      tasks: tempTasks,
    });
    console.log(this.state.tasks[index].isDone);
  };

  checkTask = (index) => {
    let tempTasks = this.state.tasks.slice();
    tempTasks[index].isChecked = !tempTasks[index].isChecked;
    this.setState({
      tasks: tempTasks,
    });
    console.log(this.state.tasks[index].isChecked);
  };

  //თუ არ შედის ტასკს რატომ ააფდეითებს
  //
  editTask = (e) => {
    // let tempTasks = this.state.tasks.slice();
    // console.log(this.state.tasks);
    // setTimeout(() => {
    //   // let tempTasks = this.state.tasks.slice();
    //   tempTasks[this.state.editTaskIndex].name = this.state.editTaskValue;
    //   console.log(this.state.tasks);
    //   if (this.isValidInput(this.state.editTaskValue)) {
    //     console.log("shemodis");
    //     // this.setState({
    //     //   editMode: false,
    //     //   tasks: tempTasks,
    //     //   error: "",
    //     // });
    //   }
    // }, 2000);

    // console.log(this.state.editMode);

    const tempTasks = this.state.tasks.map((task, index) => {
      if (
        index === this.state.editTaskIndex &&
        this.isValidInput(this.state.editTaskValue)
      )
        task.name = this.state.editTaskValue;
      return task;
    });
    this.setState({ tasks: tempTasks, editMode: false });
  };

  move = (index, add) => {
    let tempTasks = this.state.tasks.slice();
    if (index === tempTasks.length - 1 && add === 1) {
      this.setState({ error: "No more way down!" });
    } else if (index === 0 && add === -1) {
      this.setState({ error: "No more way up!" });
    } else {
      let tmp = tempTasks[index];
      tempTasks[index] = tempTasks[index + add];
      tempTasks[index + add] = tmp;
      this.setState({ tasks: tempTasks, error: "" });
    }
  };

  deleteAll = (e) => {
    e.preventDefault();
    this.setState({
      tasks: [],
    });
  };

  deleteCompletedTasks = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.filter((el) => el.isDone === false),
    });
  };

  deleteCheckedTasks = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.filter((el) => el.isChecked === false),
    });
  };

  render() {
    return (
      <div style={styles.Container}>
        <form style={styles.centerContainer}>
          <Input
            type="text"
            value={this.state.inputTaskValue}
            onChange={this.changeInput}
            style={{ width: "400px" }}
          />
          <Button
            variant="contained"
            onClick={this.addTask}
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
            onClick={this.clearInputField}
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
            onClick={this.deleteAll}
            style={{
              backgroundColor: "#EF5350",
              color: "white",
            }}
          >
            Delete All Tasks
          </Button>
          <Button
            variant="contained"
            onClick={this.deleteCompletedTasks}
            style={{
              backgroundColor: "#EF5350",
              color: "white",
            }}
          >
            Delete Done tasks
          </Button>
          <Button
            variant="contained"
            onClick={this.deleteCheckedTasks}
            style={{
              backgroundColor: "#EF5350",
              color: "white",
            }}
          >
            Delete Checked Tasks
          </Button>
        </div>
        <div className="conditional">
          {this.state.editMode && (
            <div style={styles.centerContainer} className="popup">
              <Input
                type="text"
                value={this.state.editTaskValue}
                onChange={(e) => {
                  this.setState({ editTaskValue: e.target.value });
                }}
              />
              <Button onClick={() => this.editTask()}>Edit</Button>
              <Button
                onClick={() => {
                  this.setState({ editMode: false, error: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          
          {this.state.error && <Error error = {this.state.error}/>}
        </div>
        <ul>
          {this.state.tasks.map((task, index) => (
            <div key={"task" + index}>
              <li>
                <div>
                  <Checkbox
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => this.checkTask(index)}
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
                    onClick={this.removeTask.bind(this, index)}
                  >
                    X
                  </ColorButton>
                  <ColorButton
                    style={{
                      backgroundColor: "#8BC34A",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={this.markAsDone.bind(this, index)}
                  >
                    Done
                  </ColorButton>
                  <ColorButton
                    style={{
                      backgroundColor: "#00BCD4",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={() => {
                      this.move(index, -1);
                    }}
                  >
                    ↑
                  </ColorButton>
                  <ColorButton
                    style={{
                      backgroundColor: "#00BCD4",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={() => {
                      this.move(index, 1);
                    }}
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
                      this.setState({
                        editMode: true,
                        editTaskValue: this.state.tasks[index].name,
                        editTaskIndex: index,
                      });
                    }}
                  >
                    Edit
                  </ColorButton>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
