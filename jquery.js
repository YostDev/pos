
        let stockProductos = JSON.parse(localStorage.getItem('productos_stock')) || [];
        let listaTicket = JSON.parse(localStorage.getItem('lista_ticket')) || [];

        function cargarInventario() {
            let $inventario = $('.inventario');
            $inventario.empty(); 

            if (stockProductos.length === 0) {
                $inventario.html('<p class="aviso">No hay productos en el inventario.</p>');
                return;
            }

            
            stockProductos.forEach(function(producto) {
                let estructuraProducto = `
                    <div class="item-producto">
                        <span><strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)}</span>
                        <button class="btn-añadir" data-id="${producto.id}">Añadir</button>
                    </div>
                `;
                
                $inventario.append(estructuraProducto);
            });
        }

        
        function cargarTicket() {
            let $ticket = $('.ticket');
            $ticket.empty(); 

            let total = 0;

            if (listaTicket.length === 0) {
                $ticket.html('<p>El ticket está vacío.</p>');
                $('#total-precio').text('0.00');
                return;
            }

            
            listaTicket.forEach(function(item) {
                total += item.precio;

                let estructuraTicket = `
                    <div class="item-ticket">
                        <span>${item.nombre}</span>
                        <span>$${item.precio.toFixed(2)}</span>
                    </div>
                `;
                $ticket.append(estructuraTicket);
            });
            $(".cantidad").text("Cantidad: " + listaTicket.length)
            $('#total-precio').text("$" + total.toFixed(2));
        }

        
        $('#btn-limpiar-ticket').on('click', function() {
   
            listaTicket = [];

    
            localStorage.setItem('lista_ticket', JSON.stringify(listaTicket));
            cargarTicket();
        });
        
        $('.inventario').on('click', '.btn-añadir', function() {
    let idProducto = $(this).data('id');
    
    // Guardamos la referencia al botón que fue clickeado
    let $boton = $(this);

    let productoSeleccionado = stockProductos.find(p => p.id === idProducto);

    if (productoSeleccionado) {
        listaTicket.push(productoSeleccionado);
        localStorage.setItem('lista_ticket', JSON.stringify(listaTicket));
        cargarTicket();

        
        
        let textoOriginal = $boton.html(); 
        

        $boton.html('<i class="fa-solid fa-check"></i>');
        $boton.css({
            'background-color': '#3a6c67', 
            'color': 'white',
            'pointer-events': 'none'       
        });
        
        setTimeout(function() {
            $boton.html(textoOriginal);
            $boton.css({
                'background-color': '', 
                'color': '',
                'pointer-events': 'auto' 
            });
        }, 500);
    }
});

        $(document).ready(function() {
            cargarInventario();
            cargarTicket();
        });