import React, { Component } from 'react';

class FormularioEditar extends Component {
	state =  {
		cliente: this.props.cliente,
		emails: this.props.cliente.emails
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
		
	handleChange = e => {
		const { name, value } = e.target
		this.setState({
			cliente: {
				...this.state.cliente,
				[name]: value
			}
		})
	}

	render() { 
		const { cliente: { nombre, apellido, empresa, edad, tipo }, emails } = this.state;
					
		return (
			<form className="col-md-8 m-3">
				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Nombre</label>
						<input
							onChange={this.handleChange}
							type="text"
							name="nombre"
							className="form-control" 
							defaultValue={nombre}
						/>
					</div>
					<div className="form-group col-md-6">
						<label>Apellido</label>
						<input
							onChange={this.handleChange} 
							type="text" 
							name="apellido"
							className="form-control" 
							defaultValue={apellido}
							/>
					</div>
				</div>
									
				<div className="form-row">
						<div className="form-group col-md-12">
							<label>Empresa</label>
							<input
								onChange={this.handleChange}
								type="text" 
								name="empresa"
								className="form-control"
								defaultValue={empresa} 
							/>
						</div>

						{emails.map((input, index) => (
							<div key={index} className="form-group col-md-12">
								<label>Email {index + 1} : </label>
								<div className="input-group">
									<input
										type="email"
										placeholder={`Email`}
										className="form-control" 
										onChange={e => this.leerCampo(e, index)}
										defaultValue={input.email}
									/>
									<div className="input-group-append">
										<button 
											className="btn btn-danger" 
											type="button" 
											onClick={() => this.quitarCampo(index)}> 
											&times; Eliminar
										</button>
									</div>
								</div>
							</div>
						))}
						<div className="form-group d-flex justify-content-center col-md-12">
							<button 
								onClick={this.nuevoCampo}
								type="button" 
								className="btn btn-warning">+ Agregar Email</button>
						</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Edad</label>
						<input
							onChange={this.handleChange} 
							type="text" 
							name="edad"
							className="form-control"
							defaultValue={edad}
						/>
					</div>
					<div className="form-group col-md-6">
						<label>Tipo Cliente</label>  
						<select 
							className="form-control" 
							onChange={this.handleChange} 
							name="tipo" 
							defaultValue={tipo}
						>
							<option value="">Elegir...</option>
							<option value="PREMIUM">PREMIUM</option>
							<option value="BASICO">BÁSICO</option>
						</select>
					</div>
				</div>
				<button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
			</form>
		)      
	}
}
 

export default FormularioEditar