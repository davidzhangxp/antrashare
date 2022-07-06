import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    text: string,
    length: number = 20,
    suffix: string = '...'
  ): unknown {
    if (text && text.length > length) {
      return text.substring(0, length) + suffix;
    }
    return text;
  }
}
