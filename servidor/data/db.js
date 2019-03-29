import mongoose from 'mongoose'
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

const Clientes = mongoose.model('clientes', clientesSchema)
const Productos = mongoose.model('productos', productosSchema)
const Pedidos = mongoose.model('pedidos', pedidosSchema)

export { Clientes, Productos, Pedidos }