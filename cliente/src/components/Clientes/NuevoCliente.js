import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'

import { NUEVO_CLIENTE } from '../../mutations'

export default class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      tipo: ''
    },
    emails: []
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      cliente: {
        ...this.state.cliente,
        [name]: value
      }
    })
  }

  handleSubmit = (e, crearCliente) => {
    e.preventDefault()
    const { cliente: { nombre, apellido, empresa, edad, tipo }, emails } = this.state
		const input = {
			nombre,
			apellido,
			empresa,
			edad: Number(edad),
			emails,
			tipo
		}

		crearCliente({
			variables: { input }
		})
  }

  nuevoCampo = () => {
    const { emails } = this.state
    this.setState({
      emails: emails.concat([{ email: '' }])
    })    
  }

  quitarCampo = i => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    })    
  }

  leerCampo = (e, i) => {
    const { emails } = this.state
    
    const nuevoEmail = emails.map((email, index) => {
      if (i !== index) return email
      return {
        ...email,
        email: e.target.value
      }
    })

    this.setState({
      emails: nuevoEmail
    })
  }
    

  render() {
    const { emails } = this.state
    return (
      <Fragment>
        <h2 className="text-center">NuevoCliente</h2>
        <div className="row justify-content-center">
          <Mutation mutation={NUEVO_CLIENTE} onCompleted={() => this.props.history.push('/')}>
            { crearCliente => (
              <form className="col-md-8 m-3" onSubmit={e => this.handleSubmit(e, crearCliente)}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre</label>
                    <input required onChange={this.handleChange} name="nombre" type="text" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido</label>
                    <input required onChange={this.handleChange} name="apellido" type="text" className="form-control" placeholder="Apellido" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Empresa</label>
                    <input required onChange={this.handleChange} name="empresa" type="text" className="form-control" placeholder="Empresa" />
                  </div>
                  {
                    emails.map((_, index) => (
                      <div key={index} className="form-group col-md-12">
                        <label>Email {index + 1}</label>
                        <div className="input-group">
                          <input onChange={e => this.leerCampo(e, index)} name="email" type="email" className="form-control" placeholder="Email" />
                          <div className="input-group-append">
                            <button type="button" className="btn btn-danger" onClick={() => this.quitarCampo(index)}>&times; Eliminar</button>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button type="button" className="btn btn-warning" onClick={this.nuevoCampo}>+ Agregar Email</button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Edad</label>
                    <input required onChange={this.handleChange} name="edad" type="text" className="form-control" placeholder="Edad" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Tipo Cliente</label>
                    <select required className="form-control" onChange={this.handleChange} name="tipo">
                      <option value="">Elegir...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASICO">BÁSICO</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
              </form>
            )}            
          </Mutation>
        </div>
      </Fragment>
    )
  }
}
