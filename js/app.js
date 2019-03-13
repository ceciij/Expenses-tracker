//Variables
const presupuestoUsuario = prompt('Cual es el presupuesto de esta semana?');
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
    }
    // Metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad=0) {
        return this.restante -= Number(cantidad);
    }
}
// Clase de Interfaz .. tiene todo lo relacionado con HTML (sin constructor)

class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        //insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            div.classList.add('alert-danger');
        }
        else{
            div.classList.add('alert-success');
        }
        div.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(div, formulario);

        // Quitar el alert despues de 3 seg
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000)
    }

    agregarGastoLista(nombre, cant){
        const gastosListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${nombre}  <span class= 'badge badge-primary badge-pill' >$ ${cant} </span>`;
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesto restante

    presupuestoRestante(cantGasto){
        const restante = document.getElementById('restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantGasto);  
        restante.innerHTML= `$${presupuestoRestanteUsuario}`; 
        this.cambiaColorRestante(presupuestoUsuario,presupuestoRestanteUsuario);
    }
    
    // Cambiar de color el presupuesto
    cambiaColorRestante(presupuesto, restante){
        const cuadro = document.querySelector('.restante');
        if(restante <= (presupuesto*.20)){
            cuadro.className='restante alert alert-danger';
        }
        else if(restante <= (presupuesto*.50)){
            cuadro.className='restante alert alert-warning';
        }
    }
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    if (presupuestoUsuario === null || presupuestoUsuario === '' ){
        window.location.reload();
    }
    else{
        // Instanciar presupuesto
        cantidadPresupuesto= new Presupuesto(presupuestoUsuario);
        // Instanciar clase Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // Leemos del formulario los gastos y las cantidades
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto = document.getElementById('cantidad').value;

    // Instanciar la interfaz 
    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje('Por favor, llena todos los campos', 'error');

    }
    else{
        // Mensaje correcto
        ui.imprimirMensaje('Agregando gasto al listado', 'correcto');

        // Agregar gasto al listado
        ui.agregarGastoLista(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
        
    }



})