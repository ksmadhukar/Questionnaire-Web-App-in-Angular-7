import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { QuestionnaireComponent } from './questionnaire.component';
import { ProgressComponent } from '../progress/progress.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  //let submitEl: DebugElement;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireComponent, ProgressComponent],
      imports: [BrowserModule, FormsModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //submitEl = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  
  
  it('should navigate to previous question when clicked', () => {
    component.PrevQuestion();
    expect(component.VisibleIndex).toBe(-1);
  });

  // it('setting enabled to true disables the submit button', () =>{
  //   component.VisibleIndex = 0;
  //   fixture.detectChanges();
  //   expect(submitEl.nativeElement.disabled).toBeTruthy();
  // });

  it('should show error message if none of the questions were answered', () => {
    let isValid = false;
    let message = '';
    debugElement.query(By.css('button.DoneQuestion')).triggerEventHandler('click', null);

    fixture.detectChanges();
    // const value = debugElement.query(By.css('h1')).nativeElement.innerText;
    // const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(isValid).toContain('false');
    expect(message).toContain('Please fill');
  });
  
  
});
