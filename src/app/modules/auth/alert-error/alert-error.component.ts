import {Component, Input, OnInit} from '@angular/core';
import {icon} from "../../../../assets/images";

@Component({
  selector: 'alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnInit {

  constructor() {
  }

  @Input() alertText = '';
  iconLock = icon.lock;

  closeAlert(){
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
