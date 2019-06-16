import React, { useState, useEffect } from "react";

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

    useEffect(() => {
      // Обновляем заголовок документа, используя API браузера
      document.title = `Вы нажали ${this.count} раз`;
    });

    return (
      <div>
        <button onClick={this.incHandler}>+</button>
        <button onClick={this.decHandler}>-</button>
        <hr />
        <button onClick={() => setCount(this.count)}>ok</button>
        <hr />
        {this.count}
        <hr />
        {counts}
      </div>
    );
  }
}

export default App;
