import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import UsersService from './services/UsersService';

function App() {
  var usersService = new UsersService();

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <NavLink to="/" >Книги</NavLink>
          <NavLink to="/authors" >Письменники</NavLink>
          {usersService.IsLoggedIn() &&
            <NavLink to="/favorites" >Вподобані</NavLink>
          }
          {!usersService.IsLoggedIn() &&
            <NavLink to="/login" >Авторизуватись</NavLink>
          }
        </nav>
        {/* //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <Outlet />
    </div>
  );
}

export default App;
