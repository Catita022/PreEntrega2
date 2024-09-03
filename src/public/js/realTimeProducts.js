


// config el socket del lado del cliente 


const socket = io()

const titulo = document.getElementById('title')
const descripcion = document.getElementById("description");
const codigo = document.getElementById("code")
const precio = document.getElementById("price")
const stock = document.getElementById("stock")
const categoria = document.getElementById("category")
const form = document.getElementById('registerForm');


//-----------------------parte button
const crear = document.getElementById('crearProducts')
const borrar = document.getElementById('deletePoducts')
const logs = []
crear.addEventListener('click', () => {

    socket.on('log', data => {



        // Iteracion de []data
        data.logs.forEach(log => {

            logs.push(log.message)


        });
        // muestra el array donde tengo el objeto de producots
        logs.forEach(l => {
            // agrego los productos a la card 

            titulo.innerHTML = 'Title: ' + l['title'],
                descripcion.innerHTML = 'Description: ' + l['description'],
                codigo.innerHTML = 'Code: ' + l['code'],
                precio.innerHTML = 'Price: ' + l['price'],
                stock.innerHTML = 'Stock: ' + l['stock'],
                categoria.innerHTML = 'Category: ' + l['category']
        })
        form.reset()

    })
})


borrar.addEventListener('click', () => {
    titulo.innerHTML = '',
        descripcion.innerHTML = '',
        codigo.innerHTML = '',
        precio.innerHTML = '',
        stock.innerHTML = '',
        categoria.innerHTML = ''


    socket.emit('message', logs)
    socket.on('alertProd', data => {

        if (data) {
            alert(`Eliminaste:\n title -> ${data.title}\n description-> ${data.description}\n code-> ${data.code}`)
        } else {
            alert('debes cargar un producto')
        }

    })
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    // console.log(data)
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("Objeto formado:");
    socket.emit('message2', obj)
    // console.log(obj);
})



