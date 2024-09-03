
import express from 'express';
import productsRouter from './routes/products.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import ProductManager from './service/ProductManager.js';
//-------------------------------------------
const productos = new ProductManager()
const app = express();



//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion hbs

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');


// configuracion archivo public

// app.use(express.static('public'));
app.use(express.static(__dirname + '/public/'))

// Router..


app.use('/products', viewRouter)

app.use('/api/products', productsRouter)



const SERVER_PORT = 9090;

//---------------config de socket (server)
const httpServer = app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

// canal de comunicacion del lado del server
const socketServer = new Server(httpServer);

const logs = [];

// console.log(logs)
socketServer.on('connection', socket => {
    // toda la logica referente a socket va aqui dentro de este bloque 
    console.log('nuevo cliente conectado')
    socket.on('message2',data=>{
        productos.addProduct(data)
        logs.push({message:data})
        socketServer.emit('log',{logs})
        console.log(data)
    })

    socket.on('message',data=>{
        const long = productos.getAllProducts()
        const prodDelete = productos.getProductById(long.length)
        console.log(long.length)
        productos.deleteProduct(long.length)
        socket.emit('alertProd',prodDelete)
        
    })
  

})
