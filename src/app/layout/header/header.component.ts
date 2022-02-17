import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public selectedCategory = new String('general');
  public searchQuery;
  public date: Date;
  constructor(
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
  }
  onSearch(): void{
    if(this.searchQuery){
       this.dataSharingService.setSearchQuery(this.searchQuery);
  }
  }
  public changeCategory(category: String): void{
    this.selectedCategory = category;
    this.searchQuery = null;
    this.dataSharingService.setCategory(this.selectedCategory);
  }
}
