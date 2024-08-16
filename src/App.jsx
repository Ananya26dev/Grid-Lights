import { useState } from "react";
import "./App.css";
function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={label}
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
    ></button>
  );
}
const App = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivated, setDeactivated] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const deactivateCells = () => {
    setDeactivated(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setDeactivated(false);
        }
        return newOrder;
      });
    }, 300);
  };
  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              isDisabled={order.includes(index) || isDeactivated}
            />
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
};

export default App;
