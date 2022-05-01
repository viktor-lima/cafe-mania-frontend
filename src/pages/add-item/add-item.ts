import { Component } from '@angular/core';
import { t } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryDTO } from '../../models/category.dto';
import { CollaboratorDTO } from '../../models/collaborators.dto';
import { CategoryService } from '../../services/domain/category.service';
import { CollaboratorService } from '../../services/domain/collaborator.service';
import { StrorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  formGroup: FormGroup;
  collaborator: CollaboratorDTO;
  categories: CategoryDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public collaboratorService: CollaboratorService,
    public storage: StrorageService) {

      this.formGroup = this.formBuilder.group({
        name:['Queijo',[Validators.required]],
        description:['Queijo prado',[]],
        categoryId:[null,[]],
        collaboratorId:[null,[]]
      });
  } 

  ionViewDidLoad() {
    this.categoryService.findAll()
     .subscribe(response=>{
        this.categories = response;
        this.formGroup.controls.categoryId.setValue(this.categories[0].id);
     },
     error=>{

     });
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response;
          this.formGroup.controls.collaboratorId.setValue(this.collaborator.id);
          console.log(this.collaborator);
          
        },
        error => { });
    }
  }
 

  addItem(){
    console.log(this.formGroup.value);
  }

}
