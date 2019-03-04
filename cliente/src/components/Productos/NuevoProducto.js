import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'

import { NUEVO_PRODUCTO } from '../../mutations'

export default class NuevoProducto extends Component {
  state = {
    producto: {
      nombre: '',
      precio: 0,
      stock: 0
    }
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      producto: {
        ...this.state.producto,
        [name]: value
      }
    })
  }

  validarForm = () => {
    const { producto: { nombre, precio, stock } } = this.state
    const noValido = !nombre || !precio || !stock
    return noValido
  }

  handleSubmit = (e, nuevoProducto) => {
    e.preventDefault()
    const { producto: { nombre, precio, stock } } = this.state
    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    }  

    nuevoProducto({
      variables: { input }
    })
  }

  render() {
    return (
      <Fragment>
        <h2 className="text-center">NuevoProducto</h2>
        <div className="row justify-content-center">
          <Mutation mutation={NUEVO_PRODUCTO} onCompleted={() => this.props.history.push('/productos')}>
            {nuevoProducto => (
              <form className="col-md-8 m-3" onSubmit={e => this.handleSubmit(e, nuevoProducto)}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    required
                    onChange={this.handleChange}
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del Producto"
                  />
                </div>
                <div className="form-group">
                  <label>Precio:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input
                      required
                      onChange={this.handleChange}
                      type="number"
                      name="precio"
                      className="form-control"
                      placeholder="Precio del Producto"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Stock:</label>
                  <input
                    required
                    onChange={this.handleChange}
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="stock del Producto"
                  />
                </div>
                <button
                  disabled={this.validarForm()}
                  type="submit"
                  className="btn btn-success float-right">
                  Crear Producto
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    )
  }
}
