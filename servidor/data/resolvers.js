import mongoose from 'mongoose'
import { Clientes } from './db'
import { rejects } from 'assert'

export const resolvers = {
  Query: {
    getClientes: (root, { limite, offset }) => {
      return Clientes.find().limit(limite).skip(offset)
    },
    getCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (err, cliente) => {
          if (err) rejects(err)
          resolve(cliente)
        })
      })
    },
    totalClientes: root => {
      return new Promise(resolve => {
        Clientes.countDocuments({}, (err, count) => {
          if (err) rejects(err)
          resolve(count)
        })
      })
    }
  },
  Mutation: {
    crearCliente: (root, { input: { nombre, apellido, empresa, emails, edad, tipo, pedidos } }) => {
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

      return new Promise((resolve, object) => {
        nuevoCliente.save(err => {
          if (err) rejects(err)
          resolve(nuevoCliente)
        })
      })
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, cliente) => {
          if (err) rejects(err)
          resolve(cliente)
        })
      })
    },
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndRemove({ _id: id }, err => {
          if (err) rejects(err)
          resolve(`El cliente nº ${id} se eliminó correctamente.`)
        })
      })
    },
  }
}