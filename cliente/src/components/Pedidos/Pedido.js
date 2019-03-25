import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { OBTENER_PRODUCTO } from '../../queries'
import { ACTUALIZAR_PEDIDO } from '../../mutations'

import Loader from '../Loader'
import ResumenProducto from './ResumenProducto'

const Pedido = ({ pedidos, cliente }) => {
  const { estado, id, pedido, total, fecha } = pedidos
  const date = new Date(Number(fecha))

  let clase 
  if (estado === 'PENDIENTE') clase = 'border-light'
  if (estado === 'CANCELADO') clase = 'border-danger'
  if (estado === 'COMPLETADO') clase = 'border-success'


  const updatePedido = (e, actualizarPedido) => {
    const input = {
      ...pedidos,
      estado: e.target.value,
      cliente
    }  

    actualizarPedido({
      variables: { input }
    })
  }

  return (
    <Fragment>
      <div className="col-md-4">
        <div className={`card mb-3 ${clase}`} >
          <div className="card-body">
            <p className="card-text font-weight-bold ">Estado:
              <Mutation mutation={ACTUALIZAR_PEDIDO}>
                {actualizarPedido => (
                  <select className="form-control my-3" defaultValue={estado} onChange={e => updatePedido(e, actualizarPedido)}>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                  </select>
                )}
              </Mutation>
            </p>
            <p className="card-text font-weight-bold">Pedido ID:
              <span className="font-weight-normal"> {id}</span>
            </p>
            <p className="card-text font-weight-bold">Fecha Pedido:
              <span className="font-weight-normal"> {date.toLocaleString('es')}</span>
            </p>
            <p className="card-text font-weight-bold">Total:
              <span className="font-weight-normal"> {total}</span>
            </p>

            <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
            {
              pedido.map(item => (
                <Query key={item.id} query={OBTENER_PRODUCTO} variables={{ id: item.id }}>
                  {({ loading, error, data }) => {
                    if (loading) return <Loader />
                    if (error) return `Error: ${error.message}`
                    return <ResumenProducto producto={data.obtenerProducto} cantidad={item.cantidad} />
                  }}
                </Query>
              ))
            }            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Pedido