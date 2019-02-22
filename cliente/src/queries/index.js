import gql from 'graphql-tag'

export const CLIENTS_QUERY = gql`
  query getClientes($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
    totalClientes
  }
`

export const CLIENT_QUERY = gql`
  query ConsultarClientes($id: ID){
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`