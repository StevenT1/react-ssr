import React, { useEffect } from 'react';
import Home from './Home';
import About from './About';
import routes from './Routes';
import { renderRoutes } from 'react-router-config';
import { Link, Switch, Route } from 'react-router-dom';
// const App = () =>{
//     return <h1>hello react</h1>
// }

// export default App;
export default function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      {renderRoutes(routes)}
      {/* <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>

            </Switch> */}
    </div>
  )
}
