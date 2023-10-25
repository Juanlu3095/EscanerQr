/**
 * Clase qr con los campos de la BBDD
*/

export class qr {
    constructor(
        public datos_registro: string,
        public fecha_registro: string,
        public id_registro?: number,
        
    ) { }

}