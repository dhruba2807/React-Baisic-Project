//single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple];
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple);
  }

  console.log(selected, multiple);
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
              {/* {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}

/*

Q1: What is the difference between single and multiple selection in this accordion?
Answer:
In single selection, only one accordion item can be open at a time. In multiple selection mode, users can open and close multiple items independently. This is managed using two different states: selected (for single) and multiple array (for multi).

Q2: Why do we use useState here?
Answer:
useState is used to track:

selected: ID of the item currently open (for single selection)

enableMultiSelection: Boolean to toggle between single and multiple selection modes

multiple: Array of item IDs currently open (for multi selection)

Q3: How does conditional rendering work in this component?
Answer:
It uses ternary operators (condition ? true : false) and logical conditions (condition && JSX) to decide whether to show the answer part of an accordion item.

Q4: How do you update an array in React state?
Answer:
By creating a copy of the existing array (let copy = [...array]), modifying it (like push or splice), and then updating the state using the setter function (setArray(copy)).

Q5: Why is it important not to mutate state directly in React?
Answer:
Direct mutation can lead to unexpected behavior because React relies on detecting state changes via reference comparison. Always use state setters to ensure proper re-renders.*/ 