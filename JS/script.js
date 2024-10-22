(() => {
    /*
    evita que los formularios se cargen al momento de enviarlos, pero solo si los formularios
    tienen la clase needs-validation
    */
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');

        }, false)

        form.addEventListener('reset', event => {
            form.classList.remove('was-validated')
        }, false)
    })
})();

function alertas(msg, icono) {
    /* 
        permite mostrar una mensaje emergente usando la librerìa sweetalert
        icono: warning info success
    */
    Swal.fire({
        position: 'center',
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 3000
    })
}

function confirmationAlert(titulo, texto, icon) {
    /* permite mostrar una ventama emergente  de confirmacion usando la librerìa sweetalert
        retorta un objeto y para y se implementa el siguiente codigo:
        .then((result) => {
            if (result.isConfirmed) {
            }
        });
    */
    return Swal.fire({
        title: titulo,
        html: texto,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    });
}
