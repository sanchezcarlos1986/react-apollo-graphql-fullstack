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
// PRODUCTOS
export const PRODUCTOS_QUERY = gql`
  query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean){
    obtenerProductos(limite: $limite, offset: $offset, stock: $stock) {
      id
      nombre
      precio
      stock
    }
    totalProductos
  }
`

export const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID){
    obtenerProducto(id: $id) {
      id
      nombre
      precio
      stock
    }
  }
`

// PEDIDOS
export const OBTENER_PEDIDOS = gql`
  query obtenerPedidos($cliente: ID) {
    obtenerPedidos(cliente: $cliente) {
      id
      pedido {
        id
        cantidad
      }
      total
      estado
      fecha
    }
  }
`

// GRÁFICAS
export const TOP_CLIENTES = gql`
  query topClientes {
    topClientes {
      total
      cliente {
        nombre
        apellido
        edad
        emails {
          email
        }
      }
    }
  }
`