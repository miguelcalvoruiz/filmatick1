import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { toBase64 } from '../helpers';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  imgBase64!: string;

  @Input()
  urlImgCurrent!: string;

  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  change(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      toBase64(file)
        .then((value: unknown) => {
          if (typeof value === 'string') {
            this.imgBase64 = value;
          } else {
            throw new Error('Value is not a string');
          }
        })
        .catch((error: any) => {
          console.error('Error converting to base64:', error);
        });
        this.fileSelected.emit(file);
        this.urlImgCurrent = '';
    }
  }


}
