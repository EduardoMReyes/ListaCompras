    let contador = 0;
    let costoTotal = 0;
    let totalEnProductos = 0;
    //arreglo global para almacenar lista de compras
    let datos = [];

    let element = document.getElementById("totalPrecio");
    element.innerHTML="Total en precio";
    let txtNombre= document.getElementById("Name");
    let txtNumber = document.getElementById("Number");
    let total = document.getElementById("precioTotal");

    let tabla = document.getElementById("tablaListaCompras");
    let cuerpoTabla = tabla.getElementsByTagName("tbody");

    function validarNombre(){
        if(txtNombre.value.length <= 3 ){
            return false;
        }//if
        return true;
    }// Validar nombre
    function validarCantidad(){
        if(txtNumber.value.length==0) {
            return false;
        }// if
         if (isNaN(txtNumber.value)){
            return false;
         }//if

         if (parseFloat(txtNumber.value)<=0) {
            return false;
         }//if
         return true;
    }// validarCantidad

    let agregar =document.getElementById("btnAgregar");
    
    agregar.addEventListener ("click", (event)=> {
        event.preventDefault();
        if ( (! validarNombre()) || (! validarCantidad()) ){
            let lista="";
            if(!validarNombre()){
                txtNombre.style.border="red thin solid";
                lista+="<li>Se debe escribir un nombre válido</li>";
            }//if
            if(! validarCantidad() ){
                txtNumber.style.border="red thin solid";
                lista+="<li>Se debe escribir una cantidad válida</li>";
            }//if 
            
            document.getElementById("alertValidacionesTexto").innerHTML=
            `Los campos deben ser llenados correctamente.
            <ul>${lista} </ul>
            `;
            document.getElementById("alertValidaciones").style.display="block"
            
            setTimeout(function () {
                document.getElementById("alertValidaciones").style.display="none";
            },
                5000
            );//functionTimeOut
            return false;
        }//if
        txtNumber.style.border="";
        txtNombre.style.border="";
        document.getElementById("alertValidaciones").style.display="none";
        contador++;
        document.getElementById("contadorProductos").innerHTML = contador;
        localStorage.setItem ("contadorProductos", contador);
        let precio = (Math.floor( (Math.random() * 50)*100))/100;
        let cantidad = parseFloat (txtNumber.value);
        totalEnProductos += Math.ceil(cantidad);
        document.getElementById("productosTotal").innerHTML = totalEnProductos;
        localStorage.setItem ("productosTotal", totalEnProductos);
        costoTotal += (precio * cantidad);
        total.innerHTML = `$ ${costoTotal.toFixed(2)}`;
        localStorage.setItem ("precioTotal", costoTotal.toFixed(2));
        
        //JSON
        let elemento = `{ "id": ${contador},
            "nombre": "${txtNombre.value}",
            "cantidad": "${txtNumber.value}",
            "precio": ${precio}
        }`;
        
        datos.push(JSON.parse(elemento));
        localStorage.setItem("elementosTabla", JSON.stringify(datos));
        // console.log(datos);

        let tmp= `<tr>
        <th scope="row">${contador}</th>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>$ ${precio}</td>
        </tr>`;
        cuerpoTabla[0].innerHTML += tmp;
        txtNumber.value= "";
        txtNombre.value= "";
        txtNombre.focus();
    }
);

txtNombre.addEventListener("blur", (event)=>{
        event.target.value = event.target.value.trim();
    }
);

txtNumber.addEventListener("blur", (event)=>{
    event.target.value = event.target.value.trim();
    }
);

window.addEventListener("load", function(){
        if (localStorage.getItem ("contadorProductos") != null){
        contador = parseInt(localStorage.getItem ("contadorProductos"));
        document.getElementById("contadorProductos").innerHTML = contador;
        }//if contadorProductos
         if(localStorage.getItem ("productosTotal") !=null){
         totalEnProductos = parseInt(localStorage.getItem ("productosTotal"));
         document.getElementById("productosTotal").innerHTML = totalEnProductos;
         }//if productosTotal
          if(localStorage.getItem ("precioTotal")!=null){
          costoTotal = parseInt(localStorage.getItem("precioTotal"));
          total.innerHTML = costoTotal;
          }//if precioTotal
    

           if (localStorage.getItem ("elementosTabla") != null){
                datos=JSON.parse(this.localStorage.getItem("elementosTabla"));
                datos.forEach(element => {
                    cuerpoTabla[0].innerHTML += `<tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.cantidad}</td>
                    <td>$ ${element.precio}</td>
                    </tr>`;
                });
           }//if elementosTabla
    }
    
);
