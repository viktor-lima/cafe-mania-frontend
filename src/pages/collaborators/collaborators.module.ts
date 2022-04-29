import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollaboratorsPage } from './collaborators';

@NgModule({
  declarations: [
    CollaboratorsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollaboratorsPage),
  ],
})
export class CollaboratorsPageModule {}
