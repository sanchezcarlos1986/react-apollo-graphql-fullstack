import React, { Component } from 'react'

export default class Paginador extends Component {
  state = {
    paginador: {
      paginas: Math.ceil(Number(this.props.total) / this.props.limite)
    }
  }
  render() {
    const { actual, prevPage, nextPage } = this.props
    const { paginador: { paginas } } = this.state

    return (
      <div className="mt-5 d-flex justify-content-center">
        <button 
          type="button" 
          className="btn btn-success mr-2" 
          onClick={prevPage}
          disabled={actual <= 1}
          >
          &laquo; Anterior
        </button>

        <button 
          type="button" 
          className="btn btn-success" 
          onClick={nextPage}
          disabled={actual === paginas}
        >
          Siguiente &raquo;
        </button>
      </div>
    )
  }
}
