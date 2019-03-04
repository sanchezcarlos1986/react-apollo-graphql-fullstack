import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom' 

import { ACTUALIZAR_PRODUCTO } from '../../mutations'

class FormularioEditar extends Component {
	state = {
		producto: this.props.producto,
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

	handleSubmit = (e, actualizarProducto) => {
		e.preventDefault()
		const { producto: { id, nombre, precio, stock } } = this.state
		const input = {
			id,
			nombre,
			precio: Number(precio),
			stock: Number(stock)
		}

		actualizarProducto({
			variables: { input }
		})
	}

	validarForm = () => {
		const { producto: { nombre, precio, stock } } = this.state
		const noValido = !nombre || !precio || !stock
		return noValido
	}

	render() { 
		const { producto: { nombre, precio, stock } } = this.state
		const { history } = this.props

					
		return (
			<Mutation mutation={ACTUALIZAR_PRODUCTO} onCompleted={() => history.push('/productos')}>
				{actualizarProducto => (
					<form className="col-md-8 m-3" onSubmit={e => this.handleSubmit(e, actualizarProducto)}>
						<div className="form-group">
							<label>Nombre:</label>
							<input
								required
								onChange={this.handleChange}
								type="text"
								name="nombre"
								className="form-control"
								placeholder="Nombre del Producto"
								defaultValue={nombre}
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
									defaultValue={precio}
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
								defaultValue={stock}
							/>
						</div>
						<button
							disabled={this.validarForm()}
							type="submit"
							className="btn btn-success float-right">
							Guardar Cambios
                </button>
					</form>
				)}
			</Mutation>
		)      
	}
}
 

export default withRouter(FormularioEditar)