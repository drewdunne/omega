import React from 'react';
import Menu from './components/Menu';

/**
 * Parent-level Component. Designed to conditionally-render "central hub" pages from which 
 * many features can be accessed.
 */
const App = () => {
  return (
    <div className="home">
      <Menu />
    </div>
  );
};

export default App;
