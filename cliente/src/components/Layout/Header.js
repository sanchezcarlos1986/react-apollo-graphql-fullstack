import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
    <div className="container">
      <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item active">
          <Link to="/cliente/nuevo" className="btn btn-success mr-2">
            Nuevo Cliente
          </Link>
          <Link to="/producto/nuevo" className="btn btn-success">
            Nuevo Producto
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header