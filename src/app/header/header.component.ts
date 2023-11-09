import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  viewCart: boolean = false;
  myCart$ = this.storeService.myCart$;




  constructor(private storeService: StoreService) { }

  onToggleCart() {
    this.viewCart = !this.viewCart

  };


}
