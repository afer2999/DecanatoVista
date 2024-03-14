import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../recursos/tools.service';

@Component({
  selector: 'app-admin-slider',
  templateUrl: './admin-slider.component.html',
  styleUrls: ['./admin-slider.component.css',
  '../../../assets/estilosAdmin/css/main.css',]
})
export class AdminSliderComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
    //this.objTool.ColorUsuario(1);
  }

}
