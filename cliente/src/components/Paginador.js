import React, { Component } from 'react'

export default class Paginador extends Component {
  state = {
    paginador: {
      paginas: Math.ceil(Number(this.props.totalClientes) / this.props.limite)
    }
  }
  render() {
    const { actual, prevPage, nextPage } = this.props
    const { paginador: { paginas } } = this.state
    const btnAnterior = (actual > 1) ? <button type="button" className="btn btn-success mr-2" onClick={prevPage}>&laquo; Anterior</button> : null
    const btnSiguiente = (actual !== paginas) ? <button type="button" className="btn btn-success" onClick={nextPage}>Siguiente &raquo;</button> : null

    return (
      <div className="mt-5 d-flex justify-content-center">
        {btnAnterior}
        {btnSiguiente}
      </div>
    )
  }
}
