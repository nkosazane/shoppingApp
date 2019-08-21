import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../../service/grocery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  object={
    name:"",
    price:0,
    type:"",
    key:""
  }
 
 
  
  type: any;
  name: any;
  @Input() price:string ;
  @Input() item:string ;
  @Input() itemlist:string ;
  
  constructor(private router:ActivatedRoute,private grocery:GroceryService) { }

  ngOnInit() {
    this.router.queryParams.subscribe( data => {console.log(data);

      this.item = data.item
      // console.log(data.item);
      this.object.name=data.name
      this.object.price=data.price
      this.object.type=data.type
      
      });
  }
  updateitem(object,key){
 
    this.grocery.update1(this.object,this.object.key);
  }

}
