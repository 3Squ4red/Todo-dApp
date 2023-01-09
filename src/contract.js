export const address = "0x64f7E96BEe6fc48EDbFCf0ca6fc3C8dAFd76d093";
export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "priority",
        type: "uint256",
      },
    ],
    name: "addTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newPriority",
        type: "uint256",
      },
    ],
    name: "changePriority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTasks",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "priority",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isDeleted",
            type: "bool",
          },
        ],
        internalType: "struct Task[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "removeTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; 
