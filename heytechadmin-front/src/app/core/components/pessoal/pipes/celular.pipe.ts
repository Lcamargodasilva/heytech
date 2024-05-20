import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'celular' })
export class CelularPipe implements PipeTransform {
    transform(value: string): string {
        if (value != null && value.length === 11) {
            const formattedCell = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
            return formattedCell;
        } else {
            return value;
        }
    }
}
