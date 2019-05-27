// import mongoose from 'mongoose'
import { Clientes, Productos, Pedidos, Usuarios } from './db'
import { rejects } from 'assert'

import bcrypt from 'bcrypt'

// Generar Token
import dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

import jwt from 'jsonwebtoken'

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const { usuario } = usuarioLogin

  return jwt.sign({ usuario }, secreto, { expiresIn })
}

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
    },
    topClientes: () => {
      return new Promise(resolve => {
        Pedidos.aggregate([
          {
            $match: { estado: 'COMPLETADO' }
          },
          {
            $group: {
              _id: '$cliente',
              total: { $sum: '$total' }
            }
          },
          {
            $lookup: {
              from: 'clientes',
              localField: '_id',
              foreignField: '_id',
              as: 'cliente'
            }
          },
          {
            $sort: { total: -1 }
          },
          {
            $limit: 10
          }
        ], (err, resultado) => {
          if (err) rejects(err)
          resolve(resultado)
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
        nuevoPedido.save(err => {
          if (err) rejects(err)
          resolve(nuevoPedido)
        })
      })
    },
    actualizarPedido: (_, { input }) => {
      return new Promise(resolve => {
        // recorre y actualiza la cantidad de productos en base al estado del pedido
        const { estado } = input
        let instruccion
        if (estado === 'COMPLETADO') instruccion = '-'
        if (estado === 'CANCELADO') instruccion = '+'

        input.pedido.forEach(pedido => {
          Productos.updateOne({ _id: pedido.id },
            {
              "$inc":
                { "stock": `${instruccion}${pedido.cantidad}` }
            }, function (error) {
              if (error) return new Error(error)
            }
          )
        })

        Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err) => {
          if (err) rejects(err)
          resolve(`pedido ${input.id} actualizado a ${input.estado}`)
        })
      })
    },
    crearUsuario: async (_, { usuario, password }) => {
      // revisar que un usuario no exista
      const existeUsuario = await Usuarios.findOne({ usuario })

      if (existeUsuario) {
        throw new Error(`El usuario ${usuario} ya existe.`)
      }

      const nuevoUsuario = await new Usuarios({
        usuario,
        password
      }).save()

      return `El usuario ${usuario} se creó correctamente`
    },
    autenticarUsuario: async (_, { usuario, password }) => {
      const nombreUsuario = await Usuarios.findOne({ usuario })

      if (!nombreUsuario) {
        throw new Error('El usuario no fue encontrado.')
      }

      const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password)

      // Si password es incorrecto
      if (!passwordCorrecto) {
        throw new Error('Password Incorrecto')
      }      

      return {
        token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
      }
    }
  }
}