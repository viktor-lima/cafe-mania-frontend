import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollaboratorService } from '../../services/domain/collaborator.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public collaboratorService: CollaboratorService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['' , [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
        email: ['' , [Validators.required, Validators.email]],
        cpf: ['' , [Validators.required, Validators.minLength(11)]],
        password: ['' , [Validators.required]],
        phone1: ['' , [Validators.required]],
        phone2: ['' , []],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    this.collaboratorService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOk();
    },
    error => {});
  
      
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'Registration successfully Complete',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'ok',
          handler: ()=>{
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  }
}
