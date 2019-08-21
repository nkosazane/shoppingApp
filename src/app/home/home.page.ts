import { Component } from '@angular/core';
import { GroceryService } from '../service/grocery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   
  GroceryService: any;
  data(): any {
    throw new Error("Method not implemented.");
  }
  item: string;
grocerylist;
itemlist;

  constructor(private grocery:GroceryService,private grosy:Router) {
    // this.grocerylist=this.grocery.getitems();
    this.grocery.getitems2().subscribe(data => {

   
     this.itemlist = data.map ( e => {
       return{
         key: e.payload.doc.id,
         ...e.payload.doc.data()
       } as item;
     });
     console.log(this.itemlist);
    //    for (const profileInfo of this.itemlist) {
    //      if (this.user.uid === profileInfo.userId) {
    //        this.profileUser =   profileInfo;
    //        // this.profileClass.name = this.profileUser.name;
    //        // this.profileClass.surname = this.profileUser.surname;
    //        // this.profileClass.dob = this.profileUser.dob;
    //        // this.profileClass.gender = this.profileUser.gender;
    //        console.log('Test', this.profileUser);
    //       }
    //  }
    });
  }

  update(item){

    this.grosy.navigate(['/edit'], {queryParams:{name: item.name,price: item.price,type: item.type,}})
  }

}

