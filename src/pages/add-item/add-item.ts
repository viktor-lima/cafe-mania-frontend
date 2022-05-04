import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollaboratorDTO } from '../../models/collaborators.dto';
import { ItemNewDTO } from '../../models/itemNew.dto';
import { CollaboratorService } from '../../services/domain/collaborator.service';
import { ItemService } from '../../services/domain/items.service';
import { StrorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  formGroup: FormGroup;
  collaborator: CollaboratorDTO;
  item: ItemNewDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public collaboratorService: CollaboratorService,
    public storage: StrorageService,
    public itemService: ItemService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', []],
      collaborator_id: [null, []]
    });


  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response;
        },
          error => { });
    }

  }

  addItem() {
    // console.log(this.formGroup.value);
    this.itemService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      })
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'Registration successfully Complete',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot('MyItemsPage');
          }
        }
      ]
    });
    alert.present();
  }

}
