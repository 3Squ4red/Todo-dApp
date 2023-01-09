import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Task from "./Task";
import "./App.css";

import { address, abi } from "./contract";
import { ethers } from "ethers";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isGoerli, setIsGoerli] = useState(false);
  const [todoContract, setTodoContract] = useState();

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask");
        return;
      }

      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x5") {
        setIsGoerli(true);

        // getting the account
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);

        // getting the contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        setTodoContract(contract);

        // get all the tasks
        const contractTasks = await contract.getAllTasks();
        setTasks(contractTasks);
      } else {
        alert("please switch to Goerli network");
        return;
      }
    } catch (error) {
      console.error("ERR connecting to MetaMask", error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!todoContract) return;

    try {
      const tx = await todoContract.addTask(taskTitle, taskPriority);
      await tx.wait();

      setTasks([
        ...tasks,
        {
          0: taskTitle,
          1: taskPriority,
          2: false,
          title: taskTitle,
          priority: taskPriority,
          isDeleted: false,
        },
      ]);
      alert("Task added successfully");
      setTaskTitle("");
      setTaskPriority("");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div>
      {userAddress === "" ? (
        <center>
          <button className="button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </center>
      ) : isGoerli ? (
        <div className="App">
          <h2>Task Management App</h2>
          <form>
            <TextField
              id="outlined-basic"
              label="Task title"
              variant="outlined"
              style={{ margin: "0px 5px" }}
              size="small"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Task priority"
              variant="outlined"
              style={{ margin: "0px 5px" }}
              size="small"
              type="number"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addTask}>
              Add task
            </Button>
          </form>

          <ol>
            {tasks.map((task, i) => {
              if (!task.isDeleted)
                return (
                  <li key={i}>
                    <Task
                      index={i}
                      title={task.title}
                      priority={task.priority}
                      todoContract={todoContract}
                      setTasks={setTasks}
                    />
                  </li>
                );
            })}
          </ol>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
            Please switch to the Goerli testnet and then reload{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
