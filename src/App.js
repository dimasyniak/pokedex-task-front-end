import React, { useState } from "react";

import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class App extends React.Component {
  @observable count = 0;

  incHandler = () => {
    this.count++;
  };

  decHandler = () => {
    this.count--;
  };
  render() {
    const [counts, setCount] = useState(2000);
    return (
      <div>
        <button onClick={this.incHandler}>+</button>
        <button onClick={this.decHandler}>-</button>
        <button onClick={() => setCount(5000)}>-</button>
        {this.count}
        {counts}
      </div>
    );
  }
}

export default App;
