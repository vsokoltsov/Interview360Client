import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: any, show?: boolean) : string {
    let limit = length ? parseInt(length, 10) : 10;
    let trail = '...';
    if (show) {
      return value;
    }
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
