import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email: "",
    password: "",
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response =>{
      this.auth.successfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CollaboratorsPage');
    },
    error=>{});
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response =>{
        this.auth.successfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CollaboratorsPage');
      },
      error=>{});
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
