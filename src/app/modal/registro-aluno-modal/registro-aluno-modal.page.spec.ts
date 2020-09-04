import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroAlunoModalPage } from './registro-aluno-modal.page';

describe('RegistroAlunoModalPage', () => {
  let component: RegistroAlunoModalPage;
  let fixture: ComponentFixture<RegistroAlunoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAlunoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroAlunoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
