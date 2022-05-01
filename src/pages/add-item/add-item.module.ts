import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryService } from '../../services/domain/category.service';
import { AddItemPage } from './add-item';

@NgModule({
  declarations: [
    AddItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddItemPage),
  ],
  providers:[
    CategoryService
  ]
})
export class AddItemPageModule {}
