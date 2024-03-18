import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { InputMarkdownComponent } from './input-markdown.component';

describe('InputMarkdownComponent', () => {
  let component: InputMarkdownComponent;
  let fixture: ComponentFixture<InputMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMarkdownComponent],
      imports: [FormsModule, MarkdownModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit markdown content when textarea input changes', () => {
    const markdownContent = 'This is a test markdown content';
    spyOn(component.changeMarkdown, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = markdownContent;
    textarea.triggerEventHandler('input', { target: textarea.nativeElement });
    fixture.detectChanges();
    expect(component.changeMarkdown.emit).toHaveBeenCalledWith(markdownContent);
  });

  it('should display preview tab with markdown content', () => {
    const markdownContent = 'This is a test markdown content';
    component.contentMarkdown = markdownContent;
    fixture.detectChanges();
    const previewTab = fixture.debugElement.query(By.css('mat-tab[label="Preview"]'));
    expect(previewTab).toBeTruthy();
    const previewTabContent = previewTab.query(By.css('markdown')).nativeElement.textContent.trim();
    expect(previewTabContent).toContain(markdownContent);
  });
});
