import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TreinoModalPage } from './treino-modal.page';

describe('TreinoModalPage', () => {
  let component: TreinoModalPage;
  let fixture: ComponentFixture<TreinoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreinoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TreinoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
