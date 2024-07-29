import { ComponentFixture, TestBed, tick, waitForAsync, fakeAsync } from '@angular/core/testing';

import { AsyncComponent } from './async.component';

describe('AsyncComponent', () => {
  let component: AsyncComponent;
  let fixture: ComponentFixture<AsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data with waitForAsync', waitForAsync(async() =>{
     fixture.detectChanges();
     await fixture.whenStable();
     fixture.detectChanges();
     const heroDIsplay: HTMLElement[] = fixture.nativeElement.querySelectorAll('p');
     expect(heroDIsplay.length).toBe(5);
  }));
  
  it('should get data with fakeAsync', fakeAsync(() => {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    const heroDisplay: HTMLElement[] = fixture.nativeElement.querySelectorAll('p');
    expect(heroDisplay.length).toBe(5);
  }));

});
