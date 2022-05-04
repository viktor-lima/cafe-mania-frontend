import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/items.service';

@IonicPage()
@Component({
  selector: 'page-my-items',
  templateUrl: 'my-items.html',
})
export class MyItemsPage {

  items: ItemDTO[];
  item_id: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.itemService.findPage()
      .subscribe(response => {
        this.items = response['content'];
        this.item_id = this.items.map(x => x.id);
      },
        error => { });
  }


  removeProduto(id: string) {
    this.itemService.remove(id)
      .subscribe(response => {
        this.msg();
      },
        error => { });
  }

  msg() {
    let alert = this.alertCtrl.create({
      title: 'successfully deleted',
      message: 'This action will not return',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: ()=>{
            this.navCtrl.setRoot('MyItemsPage');
          }
        }
      ]
    });
    alert.present();
  }

  showUpdate(item_id: string){
    this.navCtrl.push('UpdateItemPage', {item_id: item_id});
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}

