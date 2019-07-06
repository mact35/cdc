import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizMonitorComponent } from './matriz-monitor.component';

describe('MatrizMonitorComponent', () => {
  let component: MatrizMonitorComponent;
  let fixture: ComponentFixture<MatrizMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrizMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
