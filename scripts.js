const url = "http://localhost:4000/ropa";

//----Inputs-----//
const categoriaTxt = document.getElementById("categoria");
const marcaTxt = document.getElementById("marca");
const precioTxt = document.getElementById("precio");
const idTxt = document.getElementById("id");

const formulario = document.getElementById('formulario');
const listar = document.getElementById("listarRopa");


let editarCampos = false;


//CRUD
async function guardar() {
    
    const urlGuardar = editarCampos ? `${url}/${id}` : url;
    const data = fetch(urlGuardar, { 
        method: editarCampos ? "PUT" : "POST",
        body: JSON.stringify({
            categoria: categoriaTxt.value,
            marca: marcaTxt.value,
            precio: precioTxt.value,
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzk3nH1BswQlsVoY163f3yF8VbR5d75qfAw&usqp=CAU"
        })
    });

    console.log({
        categoria: categoriaTxt.value,
        marca: marcaTxt.value,
        precio: precioTxt.value,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzk3nH1BswQlsVoY163f3yF8VbR5d75qfAw&usqp=CAU"
    });
    await data.json();
    editarCampos = false;
    formulario.reset();
    getRopa(url);
}

async function eliminar(id) {
    await fetch(`${url}/${id}`, { method: "DELETE"});
    getRopa(url);
}

function filtrar() {
    let datoBuscar = categoria.value;
    getRopa(`${url}?q=${datoBuscar}`);
}

function obtener(id) {
    fetch(`${url}?id=${id}`).then (res => res.json())
            .then(data => {
                if (!data.length) return;
                const obj = data[0];
                idTxt.value = obj.id;
                categoriaTxt.value = obj.categoria;
                marcaTxt.value = obj.marca;
                precioTxt.value = obj.precio;
                editarCampos = true;
            })
            .catch(err => console.log(err));
}



//------------------PINTAR---------------------//
document.addEventListener('DOMContentLoaded', () => getRopa(url));

const getRopa = (url) => {
    fetch(url).then (res => res.json())
            .then(data => showRopa(data))
            .catch(err => console.log(err));
}

const showRopa =(ropaa)=>{
    listar.innerHTML = '';
    ropaa.forEach(invRopa => {
        let {id, imagen, categoria, marca, precio}=invRopa;

    let ropaNW = document.createElement ('tr');

    ropaNW.innerHTML =`
            <td>${id}</td>
            <td>${categoria}</td>
            <td>${marca}</td>
            <td>${precio}</td>
            <td>
                <img src="${imagen}" alt = "">
            </td> 
            <td>
                <button onclick="obtener(${id})">Buscar</button>
                <button onclick="eliminar(${id})">Eliminar</button>
            </td>
        `;
    listar.appendChild(ropaNW)
    });
}
