import React, { useState } from "react";

function TextArea() {
  const [state, setState] = useState({
    value: "",
    rows: 5,
    minRows: 5,
    maxRows: 10,
  });

  handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  return (
    <textarea
      rows={state.rows}
      value={state.value}
      placeholder={"Enter your text here..."}
      className={"textarea"}
      onChange={handleChange}
    />
  );
}

export default TextArea;
