import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/items.service';
import { StrorageService } from '../../services/storage.service';

/**
 * Generated class for the UpdateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-item',
  templateUrl: 'update-item.html',
})
export class UpdateItemPage {
  formGroup: FormGroup;
  item: ItemDTO[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: StrorageService,
    public itemService: ItemService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      name: ['Queijo', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['Queijo prado', []],
    });
  }

  ionViewDidLoad() {
  }

  update(){
    let item_id = this.navParams.get('item_id');
    this.itemService.update(this.formGroup.value, item_id)
      .subscribe(response =>{
        this.showInsertOk();
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'update performed',
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





