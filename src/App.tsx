import { useState } from 'react';

function App() {
  const [wow, setWow] = useState();

  return (
    <div className="divide-slate-50">
      <h1 className="font-serif text-3xl font-bold text-yellow-300 underline">
        It works and you found me!
      </h1>
    </div>
  );
}

export default App;
