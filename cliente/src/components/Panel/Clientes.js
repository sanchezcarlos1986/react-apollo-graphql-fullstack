import React from 'react'
import { Query } from 'react-apollo'
import { TOP_CLIENTES } from '../../queries'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import Loader from '../Loader'

const Clientes = () => (
  <Query query={TOP_CLIENTES}>
    {({ loading, error, data }) => {
      if (loading) return <Loader />
      if (error) return `Error: ${error.message}`

      const topClientesGrafica = []

      data.topClientes.map((pedido, index) => {
        topClientesGrafica[index] = {
          ...pedido.cliente[0],
          total: pedido.total,
        }

        return topClientesGrafica
      })
      
      return (
        <BarChart width={900} height={350} data={topClientesGrafica}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="nombre"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      )
    }}
  </Query>
)

export default Clientes