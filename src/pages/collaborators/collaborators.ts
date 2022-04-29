import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollaboratorListDTO } from '../../models/collaboratorsList.dto';
import { ItemDTO } from '../../models/item.dto';
import { CollaboratorService } from '../../services/domain/collaborator.service';
import { ItemServise } from '../../services/domain/items.service';

/**
 * Generated class for the CollaboratorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collaborators',
  templateUrl: 'collaborators.html',
})
export class CollaboratorsPage {

  collaborators: CollaboratorListDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public collaboratorService: CollaboratorService,
    public itemService: ItemServise) {
  }

  ionViewDidLoad() {
    this.collaboratorService.findAll()
      .subscribe(response => {
        this.collaborators = response;
      });
  }


}




