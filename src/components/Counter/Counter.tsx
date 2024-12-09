// import { useState } from "react";

// export const Counter = ({}): JSX.Element => {
//   const [count, setCount] = useState<number>(0);
//   const [value, setValue] = useState<string>("");

//   const increment = (): void => setCount((prev) => prev + 1);
//   const decrement = (): void => setCount((prev) => prev - 1);
//   const res = (): void => setCount(0);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setValue(e.target.value);
//   };

//   return (
//     <>
//       <h1>Счетчик {count}</h1>
//       <button onClick={increment}>Увеличить</button>
//       <button onClick={decrement}>Уменьшить</button>
//       <button onClick={res}>Обнулить</button>

//       <div>
//         <h2>Связанный импут</h2>
//         <input type="text" value={value} onChange={handleChange} />
//         <p>Значение инпута {value}</p>
//       </div>
//     </>
//   );
// };
// import React, { Component } from "react";

// interface CounterState {
//   count: number;
//   value: string;
// }

// export class Counter extends Component<{}, CounterState> {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//       value: "",
//     };

//     this.increment = this.increment.bind(this);
//   }

//   increment(): void {
//     this.setState((prevState) => ({
//       count: prevState.count + 1,
//     }));
//   }

//   decrement = (): void => {
//     this.setState((prevState) => ({
//       count: prevState.count - 1,
//     }));
//   };

//   reset = (): void => {
//     this.setState({ count: 0 });
//   };

//   handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     this.setState({ value: e.target.value });
//   };

//   render(): JSX.Element {
//     const { count, value } = this.state;

//     return (
//       <>
//         <h1>Счетчик {count}</h1>
//         <button onClick={this.increment}>Увеличить</button>
//         <button onClick={this.decrement}>Уменьшить</button>
//         <button onClick={this.reset}>Обнулить</button>

//         <div>
//           <h2>Связанный импут</h2>
//           <input type="text" value={value} onChange={this.handleChange} />
//           <p>Значение инпута {value}</p>
//         </div>
//       </>
//     );
//   }
// }
