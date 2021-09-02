import React from 'react';
import logo from './logo.svg';
import { useEmployees } from 'features/employees/employeeQueries';
import './App.css';

function App() {
  const { status, data, error, isFetching } = useEmployees();

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>I SAY GOOD DAY SIR</p>

        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <body>
        {status === 'success' &&
          data &&
          data.map((e) => {
            return (
              <ul key={e._id.toString()}>
                <li>{e.firstName}</li>
                <li>{e.lastName}</li>
                <li>{e.emailAddress}</li>
              </ul>
            );
          })}
      </body>
    </div>
  );
}

export default App;
