import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDespesasModalPage } from './add-despesas-modal.page';

describe('AddDespesasModalPage', () => {
  let component: AddDespesasModalPage;
  let fixture: ComponentFixture<AddDespesasModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDespesasModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDespesasModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
