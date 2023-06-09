import { Component, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){}

  get gifs(): string[]{
    return this.gifsService.tagsHistory;
  }

  searchCurrentTag(currentTag:string):void{
      this.gifsService.searchTag(currentTag);
  }

}
