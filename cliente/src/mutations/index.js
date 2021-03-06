import gql from 'graphql-tag'

export const NUEVO_CLIENTE = gql`
  mutation crearCliente($input: ClienteInput) {
    crearCliente(input: $input) {
      id
      nombre
      apellido
    }
  }
`

export const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($input: ClienteInput) {
    actualizarCliente(input:$input) {
      id
      nombre
      apellido
      empresa
      edad
      tipo
      emails {
        email
      }
    }
  }
`

export const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`

// PRODUCTOS
export const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput){
    nuevoProducto(input: $input) {
      id
      nombre
      precio
      stock
    }
  }
`

export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($input: ProductoInput) {
    actualizarProducto(input:$input) {
      id
      nombre
      precio
      stock
    }
  }
`

export const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`


// PEDIDOS
export const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`

export const ACTUALIZAR_PEDIDO = gql`
  mutation actualizarPedido($input: PedidoInput) {
    actualizarPedido(input: $input) 
  }
`

// USUARIOS
export const NUEVO_USUARIO = gql`
  mutation crearUsuario($usuario: String!, $password: String!) {
    crearUsuario(usuario: $usuario, password: $password)
  }
`

export const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($usuario: String!, $password: String!) {
    autenticarUsuario(usuario: $usuario, password: $password) {
      token
    }
  }
`