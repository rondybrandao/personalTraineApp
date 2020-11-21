import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagamentoMensalidadePage } from './pagamento-mensalidade.page';

describe('PagamentoMensalidadePage', () => {
  let component: PagamentoMensalidadePage;
  let fixture: ComponentFixture<PagamentoMensalidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoMensalidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoMensalidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
