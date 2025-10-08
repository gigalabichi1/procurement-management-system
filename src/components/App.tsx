'import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>სამთავრობო მართვის სისტემა</h1>
      <Login />
      <Dashboard />
      <SuppliersManagement />
    </div>
  );
};

export default App;