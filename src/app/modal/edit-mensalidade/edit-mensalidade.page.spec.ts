import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMensalidadePage } from './edit-mensalidade.page';

describe('EditMensalidadePage', () => {
  let component: EditMensalidadePage;
  let fixture: ComponentFixture<EditMensalidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMensalidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMensalidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
