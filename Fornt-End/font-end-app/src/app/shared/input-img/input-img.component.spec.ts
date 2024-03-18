import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputImgComponent } from './input-img.component';

describe('InputImgComponent', () => {
  let component: InputImgComponent;
  let fixture: ComponentFixture<InputImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputImgComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a button to select image', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('Seleccionar Imagen');
  });

  it('should display an input type file', () => {
    const input = fixture.debugElement.query(By.css('input[type="file"]'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.hidden).toBe(true);
  });

  it('should emit a file when a file is selected', () => {
    const file = new File(['content'], 'filename.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
  
    spyOn(component.fileSelected, 'emit');
    const input = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
  
    input.dispatchEvent(new Event('change'));
  
    expect(component.fileSelected.emit).toHaveBeenCalledWith(file);
  });
  

  it('should display selected image', () => {
    const imgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAA...';
    component.imgBase64 = imgBase64;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain(imgBase64);
  });

  it('should not display image if imgBase64 is empty', () => {
    component.imgBase64 = '';
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeFalsy();
  });

  it('should display image from urlImgCurrent', () => {
    const urlImgCurrent = 'https://example.com/image.jpg';
    component.urlImgCurrent = urlImgCurrent;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain(urlImgCurrent);
  });

  it('should not display image if urlImgCurrent is empty', () => {
    component.urlImgCurrent = '';
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeFalsy();
  });
});
