import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BalancoModalPage } from './balanco-modal.page';

describe('BalancoModalPage', () => {
  let component: BalancoModalPage;
  let fixture: ComponentFixture<BalancoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BalancoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
