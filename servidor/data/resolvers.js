// import mongoose from 'mongoose'
import { Clientes, Productos, Pedidos } from './db'
import { rejects } from 'assert'

export const resolvers = {
  Query: {
    getClientes: (_, { limite, offset }) => {
      return Clientes.find().limit(limite).skip(offset)
    },
    getCliente: (_, { id }) => {
      return new Promise(resolve => {
        Clientes.findById(id, (err, cliente) => {
          if (err) rejects(err)
          resolve(cliente)
        })
      })
    },
    totalClientes: () => {
      return new Promise(resolve => {
        Clientes.countDocuments({}, (err, count) => {
          if (err) rejects(err)
          resolve(count)
        })
      })
    },
    // Productos
    obtenerProductos: (_, { limite, offset, stock }) => {
      let filtro

      if (stock) {
        filtro = { stock: { $gt: 0 } }
      }

      return Productos.find(filtro).limit(limite).skip(offset)
    },
    obtenerProducto: (_, { id }) => {
      return new Promise(resolve => {
        Productos.findById(id, (err, producto) => {
          if (err) rejects(err)
          resolve(producto)
        })
      })
    },
    totalProductos: () => {
      return new Promise(resolve => {
        Productos.countDocuments({}, (err, count) => {
          if (err) rejects(err)
          resolve(count)
        })
      })
    },
    obtenerPedidos: (_, { cliente }) => {
      return new Promise(resolve => {
        Pedidos.find({ cliente }, (err, pedido) => {
          if (err) rejects(err)
          resolve(pedido)
        })
      })
    }
  },
  Mutation: {
    crearCliente: (_, { input: { nombre, apellido, empresa, emails, edad, tipo, pedidos } }) => {
      const nuevoCliente = new Clientes({
        nombre,
        apellido,
        empresa,
        emails,
        edad,
        tipo,
        pedidos
      })

      nuevoCliente.id = nuevoCliente._id

      return new Promise(resolve => {
        nuevoCliente.save(err => {
          if (err) rejects(err)
          resolve(nuevoCliente)
        })
      })
    },
    actualizarCliente: (_, { input }) => {
      return new Promise(resolve => {
        Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, cliente) => {
          if (err) rejects(err)
          resolve(cliente)
        })
      })
    },
    eliminarCliente: (_, { id }) => {
      return new Promise(resolve => {
        Clientes.findOneAndRemove({ _id: id }, err => {
          if (err) rejects(err)
          resolve(`El cliente nº ${id} se eliminó correctamente.`)
        })
      })
    },
    // Productos
    nuevoProducto: (_, { input: { nombre, precio, stock } }) => {
      const nuevoProducto = new Productos({
        nombre,
        precio,
        stock
      })

      // mongo db crea el ID que se asigna al objeto
      nuevoProducto.id = nuevoProducto._id

      return new Promise(resolve => {
        nuevoProducto.save(err => {
          if (err) rejects(err)
          resolve(nuevoProducto)
        })
      })
    },
    actualizarProducto: (_, { input }) => {
      return new Promise(resolve => {
        Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, producto) => {
          if (err) rejects(err)
          resolve(producto)
        })
      })
    },
    eliminarProducto: (_, { id }) => {
      return new Promise(resolve => {
        Productos.findOneAndRemove({ _id: id }, err => {
          if (err) rejects(err)
          resolve(`El producto nº ${id} se eliminó correctamente.`)
        })
      })
    },
    // Pedidos
    nuevoPedido: (_, {input}) => {
      const nuevoPedido = new Pedidos({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: 'PENDIENTE'
      })

      // mongo db crea el ID que se asigna al objeto
      nuevoPedido.id = nuevoPedido._id

      return new Promise(resolve => {
        // recorre y actualiza la cantidad de productos
        input.pedido.forEach(pedido => {
          Productos.updateOne({ _id: pedido.id }, 
            {
            "$inc": 
              { "stock": -pedido.cantidad }
            }, function(error) {
              if (error) return new Error(error)
            }
          )
        })
        
        nuevoPedido.save(err => {
          if (err) rejects(err)
          resolve(nuevoPedido)
        })
      })
    },
    actualizarPedido: (_, { input }) => {
      return new Promise(resolve => {
        Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err) => {
          if (err) rejects(err)
          resolve(`pedido ${input.id} actualizado a ${input.estado}`)
        })
      })
    },
    // eliminarProducto: (_, { id }) => {
    //   return new Promise(resolve => {
    //     Productos.findOneAndRemove({ _id: id }, err => {
    //       if (err) rejects(err)
    //       resolve(`El producto nº ${id} se eliminó correctamente.`)
    //     })
    //   })
    // },
  }
}