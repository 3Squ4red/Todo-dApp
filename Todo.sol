// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct Task {
    string title;
    uint256 priority;
    bool isDeleted;
}

contract Todo {
    // maps a user to a list of task
    mapping(address => Task[]) private tasks;

    // returns the list of task of the caller
    function getAllTasks() external view returns (Task[] memory) {
        return tasks[msg.sender];
    }

    // adds a new task for the caller
    function addTask(string calldata title, uint256 priority) external {
        tasks[msg.sender].push(Task(title, priority, false));
    }

    // lets the caller change the priority of a task
    function changePriority(uint256 index, uint256 newPriority) external {
        tasks[msg.sender][index].priority = newPriority;
    }

    // marks the task as deleted. should be called when that task is completed by the user
    function removeTask(uint256 index) external {
        tasks[msg.sender][index].isDeleted = true;
    }
}
