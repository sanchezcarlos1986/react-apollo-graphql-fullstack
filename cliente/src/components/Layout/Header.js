import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
    <div className="container">
      <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item dropdown mr-2">
          <button 
            data-toggle="dropdown"
            className="nav-link dropdown-toggle btn btn-block btn-success">
            Clientes
          </button>
          <div className="dropdown-menu" aria-labelledby="navagacion">
            <Link to="/clientes" className="dropdown-item">
              Ver Clientes
            </Link>
            <Link to="/clientes/nuevo" className="dropdown-item">
                Nuevo Cliente
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown">
          <button 
            data-toggle="dropdown"
            className="nav-link dropdown-toggle btn btn-block btn-success">
            Productos
          </button>
          <div className="dropdown-menu" aria-labelledby="navagacion">
            <Link to="/productos" className="dropdown-item">
              Ver Productos
            </Link>
            <Link to="/productos/nuevo" className="dropdown-item">
                Nuevo Producto
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header