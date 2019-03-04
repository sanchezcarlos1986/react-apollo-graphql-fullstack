import React, { Component, Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Layout/Header'
import Clientes from './components/Clientes/Clientes'
import NuevoCliente from './components/Clientes/NuevoCliente'
import EditarCliente from './components/Clientes/EditarCliente'

import Productos from './components/Productos/Productos'
import NuevoProducto from './components/Productos/NuevoProducto'


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
                <Route exact path="/" component={Clientes} />
                <Route exact path="/cliente/editar/:id" component={EditarCliente} />
                <Route exact path="/cliente/nuevo" component={NuevoCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/producto/nuevo" component={NuevoProducto} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
