
// CLASE USERS para login y registro con PHP

export class users{
    constructor(
        public usuario:string,
        public contrasena:string,
        public api_token: string,
        private id_usuario?: number
    ){
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.api_token = api_token;
        this.id_usuario = id_usuario;
     }
}