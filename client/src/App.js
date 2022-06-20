import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './components/Landing/index'
import Home from './components/Home';
import AddFood from './components/AddFood';
import Details from './components/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/recipe/:id' component={Details}/>
        <Route exact path='/create' component={AddFood}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
