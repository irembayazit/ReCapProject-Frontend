import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filterCarBrandPipe'
})
export class FilterCarBrandPipePipe implements PipeTransform {

  transform(value: CarDto[], filterText: string): CarDto[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarDto)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}