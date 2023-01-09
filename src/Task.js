import "./Task.css";
import { List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const Task = ({ index, title, priority, todoContract, setTasks }) => {
  const [p, setPriority] = useState(priority);
  return (
    <List className="todo__list">
      <ListItem>
        <input
          type="number"
          value={p}
          onChange={(e) => setPriority(e.target.value)}
          onKeyUp={async (e) => {
            if (!todoContract) return;

            if (e.key === "Enter" || e.keyCode === 13) {
              const newP = e.target.value;
              if (newP) {
                const tx = await todoContract.changePriority(index, newP);
                await tx.wait();

                alert(
                  `${title}'s priority successfully changed from ${priority} to ${newP}`
                );
              }
            }
          }}
        />
        <ListItemText primary={title} />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.7 }}
        onClick={async () => {
          if (!todoContract) return;

          try {
            const tx = await todoContract.removeTask(index);
            await tx.wait();

            // update the tasks list
            const contractTasks = await todoContract.getAllTasks();
            setTasks(contractTasks);
            alert("Task removed successfully");
          } catch (err) {
            console.error(err.message);
            alert(err.message);
          }
        }}
      />
    </List>
  );
};

export default Task;
