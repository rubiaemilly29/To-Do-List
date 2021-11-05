import React from 'react';
import { Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <Route exact path="/create" />
      <Route exact path="/edit/:id" /* component={ Edit } */ />
      <Route exact path="/">
        <TaskList />
      </Route>
    </div>
  );
}

export default App;
