import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { ItemService } from '../../services/domain/items.service';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {


  items: ItemDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemService: ItemService) {
  }

  ionViewDidLoad() {
    this.itemService.findAll()
      .subscribe(response => {
        this.items = response;        
      },
        error => { })
  }
}
