import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "idheart",
  standalone: true,
})
export class IdheartPipe implements PipeTransform {
  transform(arr: any[], text: string): any[] {
    return arr.filter((x) => x.id.toLowerCase().includes(text.toLowerCase()));
  }
}
