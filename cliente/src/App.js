import React, { Component, Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Layout/Header'

// Clientes
import Clientes from './components/Clientes/Clientes'
import NuevoCliente from './components/Clientes/NuevoCliente'
import EditarCliente from './components/Clientes/EditarCliente'

// Productos
import Productos from './components/Productos/Productos'
import NuevoProducto from './components/Productos/NuevoProducto'
import EditarProducto from './components/Productos/EditarProducto'

// Pedidos
import NuevoPedido from './components/Pedidos/NuevoPedido'
import PedidosCliente from './components/Pedidos/PedidosCliente'

import Panel from './components/Panel/Panel'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    networkError && console.log('networkError', networkError)    
    graphQLErrors && console.log('graphQLErrors', graphQLErrors)    
  }
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/pedidos/:id" component={PedidosCliente} />
                <Route exact path="/panel" component={Panel} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
