import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[], text: string): any[] {
    return arr.filter((x) => x.title.toLowerCase().includes(text.toLowerCase()));
  }
}
