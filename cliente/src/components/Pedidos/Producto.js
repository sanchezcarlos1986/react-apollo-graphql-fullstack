import React, { Component, Fragment } from 'react'

export default class Producto extends Component {
  state = {
    producto: {}
  }

  render() {
    const { 
      producto: { id, nombre, precio, stock },
      index,
      actualizarCantidad,
      eliminarProducto
    } = this.props
    return (
      <Fragment>
        <tr>
          <td>{nombre}</td>
          <td>$ {precio}</td>
          <td>{stock}</td>
          <td>
            <input 
              type="number"
              placeholder="10"
              className="form-control"
              onChange={e => actualizarCantidad(e.target.value, index)}
            />
          </td>
          <td> 
            <button
              type="button"
              className="btn btn-danger d-block d-md-inline-block" 
              onClick={() => eliminarProducto(id, index)}>&times; Eliminar</button>
            </td>
        </tr>
      </Fragment>
    )
  }
}
