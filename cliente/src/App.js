import React, { Component, Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Clientes from './components/Clientes'
import NuevoCliente from './components/NuevoCliente'
import EditarCliente from './components/EditarCliente'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => console.error({ networkError, graphQLErrors })
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
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
