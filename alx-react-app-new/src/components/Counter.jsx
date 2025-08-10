import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', width: '200px', textAlign: 'center', margin: '20px auto' }}>
      <p style={{ fontSize: '18px' }}>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '5px' }}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ margin: '5px' }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ margin: '5px' }}>Reset</button>
    </div>
  );
}
export default Counter;
