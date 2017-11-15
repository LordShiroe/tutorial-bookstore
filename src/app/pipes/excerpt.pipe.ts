import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(texto: string, length?: number): any {
    if (!texto || !length) {
      return texto;
    }
    let contadorPalabras = 0;
    for (let i = 1; i < texto.length; i++) {
      if (texto.charAt(i) === ' ') {
        contadorPalabras++;
      }
      if (contadorPalabras >= length) {
        texto = texto.substring(0, i) + '...';
        break;
      }
    }
    return texto;
  }

}
