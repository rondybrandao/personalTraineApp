import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlunoModalPage } from './aluno-modal.page';

describe('AlunoModalPage', () => {
  let component: AlunoModalPage;
  let fixture: ComponentFixture<AlunoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlunoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
