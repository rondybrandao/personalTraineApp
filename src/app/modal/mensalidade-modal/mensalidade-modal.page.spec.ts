import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensalidadeModalPage } from './mensalidade-modal.page';

describe('MensalidadeModalPage', () => {
  let component: MensalidadeModalPage;
  let fixture: ComponentFixture<MensalidadeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidadeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensalidadeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
