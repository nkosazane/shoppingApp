import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroceryService { 
  navigate(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
   private itemDoc: AngularFirestoreDocument<item>;

writepost;
  constructor(private angularfirestore:AngularFirestore, private afs: AngularFirestore) { }
  // getitems(){
  // return this.angularfirestore.collection('Grocery').valueChanges();
  // }
  // for making changes in the list
  getitems2(){
    return this.angularfirestore.collection('Grocery').snapshotChanges();
    }
  post(item,alert){
    this.writepost= this.angularfirestore.collection<any>('Grocery')
    this.writepost.add(item).then()
    // this.alert(start);
    console.log("successfully added")
  }
  update(item){
    item.name= "grape";
    item.price=230;
    item.type="fruit";
    this.itemDoc = this.afs.doc<item>('Grocery'+item.key);
  }
  update1(object,key){
    this.itemDoc = this.angularfirestore.doc<item>('Grocery'+ key);
    this.itemDoc.update(object);

  }
}
