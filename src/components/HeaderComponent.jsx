import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav
          className="navbar bg-dark border-bottom border-body navbar-expand-lg"
          data-bs-theme="dark"
        >
          <a className="navbar-brand">
            Employee Management Application
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className='nav-link' to='/employees'>Employees</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className='nav-link' to='/departments'>Departments</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
