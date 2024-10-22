//Clase encargada de gestionar informacion de usuarios
class UserData {

    constructor() {
        this.userdata = new Map(); //Array que almacena informacion
        this.setUserData("admin", "admin", "admin"); // usuario por defecto
    }

    setUserData(name, user, pass) {
        /*
            Se encarga de ingresar informacion en la siguiente estructura:
            nombre_usuario{
                user: nombre_usuario
                password: contraseña
                full-name:Nombre completo
            }

        */
        let data = new Map();

        if (!this.userdata.has(user)) {
            data.set("user", user);
            data.set("password", pass);
            data.set("full-name", name);

            this.userdata.set(user, data);

            return true;
        } else {
            return false;
        }
    }

    editUserData(id, name, user, pass) {//EDITA LA INFORMACION DE UN USUARIO
        
        if (this.userdata.has(id) & !this.userdata.has(user)) {

            this.userdata.delete(id);
            let data = new Map();
            data.set("user", user);
            data.set("password", pass);
            data.set("full-name", name);

            this.userdata.set(user, data);
            return true;
        } else {
            return false;
        }
    }

    hasUser(user) {//VALIDA SI UN USUARIO EXISTE
        return this.userdata.has(user);
    }

    getUserData(user) {//RETORNA UN OBJETO DE TIPO MAP CON LA INFORMACION DEL USUARIO (EN EL CASO DE QUE EXISTA)
        if (this.userdata.has(user)) {
            return (this.userdata.get(user))
        } else {
            return null;
        }

    }
}

//SE OBTIENEN LOS CAMPOS DE TEXTO DE LOS FORMULARIOS
let users = new UserData(),
    user_login = document.getElementById("user_login"),
    password_login = document.getElementById("password_login"),
    full_name_registro = document.getElementById("full_name_registro"),
    user_registro = document.getElementById("user_registro"),
    password_registro = document.getElementById("password_registro"),
    password_veri_registro = document.getElementById("password_veri_registro");


//METODO PARA REALIZAR EL LOGIN
function formLogin(e) {
    if (users.hasUser(user_login.value)) {

        let band = users.getUserData(user_login.value)

        if (band.get("password") == password_login.value) {
            //REDIRIGE LA PAGINA
            window.location = "inicio.html"
        } else {
            alertas('contraseña es incorrecta!', 'warning');
        }

    } else {
        alertas('Uuups! no te encuentras registrado', 'info');
    }
}

//METODO PARA HACER EL REGISTRO
function formLoginRegister(e) {
    confirmationAlert("Desea guardar la información?", "", "info").then((result) => {
        if (result.isConfirmed) {
            if (password_registro.value == password_veri_registro.value) {
                if (!users.hasUser(user_registro.value)) {

                    let band = users.setUserData(
                        full_name_registro.value,
                        user_registro.value,
                        password_registro.value
                    )

                    if (band) {
                        alertas('Usuario registrado correctamente', 'success');
                        e.target.reset();
                    } else {
                        alertas('No se pudo registrar la información!', 'warning');
                    }
                } else {
                    alertas('Nombre de usuario ya existe!', 'warning');
                }
            } else {
                alertas('Las contraseñas no coinciden!', 'warning');
            }
        }
    });
}
