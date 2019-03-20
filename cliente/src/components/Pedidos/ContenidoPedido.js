import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import PropTypes from 'prop-types'
import Resumen from './Resumen'
import GenerarPedido from './GenerarPedido'

export default class ContenidoPedido extends Component {
  state = {
    productos: [],
    total: 0
  }

  static propTypes = {
    productos: PropTypes.array.isRequired
  }

  seleccionarProducto = productos => {
    this.setState({
      productos
    }, () => this.actualizarTotal())
  }  

  actualizarTotal = () => {
    const { productos } = this.state
    if (!productos.length) {
      this.setState({ total: 0 })
    }

    let nuevoTotal = 0

    productos.map(producto => nuevoTotal += ((producto.cantidad || 0) * producto.precio))

    this.setState({
      total: nuevoTotal
    })
  }

  actualizarCantidad = (cantidad, index) => {
    const { productos } = this.state

    productos[index].cantidad = Number(cantidad)

    this.setState({
      productos
    }, () => {
      this.actualizarTotal()
    })
  }

  eliminarProducto = (id, index) => {
    const { productos } = this.state

    productos[index].cantidad = 0

    const productosRestantes = productos.filter(producto => producto.id !== id)

    this.setState({ productos: productosRestantes }, () => {
      this.actualizarTotal()
    })
  }

  render() {
    const { productos, id } = this.props
    return (
      <Fragment>
        <h2 className="text-center mb-5">Seleccionar Artículos</h2>
        <Select
          onChange={this.seleccionarProducto}
          options={productos}
          isMulti={true}
          components={Animated()}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.nombre}
          value={this.state.productos}
        />
        <Resumen 
          productos={this.state.productos}
          actualizarCantidad={this.actualizarCantidad}
          eliminarProducto={this.eliminarProducto}
        />
        <p className="font-weight-bold float-right">Total:
          <span className="font-weight-normal">$ {this.state.total}</span>
        </p>
        <GenerarPedido
          cliente={id}
          productos={this.state.productos} 
          total={this.state.total} 
        />
      </Fragment>
    )
  }
}
