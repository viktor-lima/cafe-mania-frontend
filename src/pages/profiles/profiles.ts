import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollaboratorDTO } from '../../models/collaborators.dto';
import { CollaboratorService } from '../../services/domain/collaborator.service';
import { StrorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  collaborator: CollaboratorDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StrorageService,
    public collaboratorService: CollaboratorService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response;
        },
        error => { });
    }
  }

}
