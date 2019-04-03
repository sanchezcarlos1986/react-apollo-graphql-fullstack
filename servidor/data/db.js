import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true })

// Definir el Schema de Clientes
const clientesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  empresa: String,
  emails: Array,
  edad: Number,
  tipo: String,
  pedidos: Array
})

// Definir el Schema de Productos
const productosSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
})

// Definir el Schema de Pedidos
const pedidosSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: mongoose.Types.ObjectId,
  estado: String
})

// Definir el Schema de Pedidos
const usuariosSchema = new mongoose.Schema({
  usuario: String,
  password: String
})

// Hashear los passwords antes de guardarlos en la base de datos
usuariosSchema.pre('save', function(next) {
  // Si el password no está modificado, ejecutar la siguiente función
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

const Clientes = mongoose.model('clientes', clientesSchema)
const Productos = mongoose.model('productos', productosSchema)
const Pedidos = mongoose.model('pedidos', pedidosSchema)
const Usuarios = mongoose.model('usuarios', usuariosSchema)

export { Clientes, Productos, Pedidos, Usuarios }