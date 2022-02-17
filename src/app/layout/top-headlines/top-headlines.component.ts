import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-top-headlines",
  templateUrl: "./top-headlines.component.html",
  styleUrls: ["./top-headlines.component.css"],
})
export class TopHeadlinesComponent implements OnInit, OnDestroy {
  public topHeadlines = [];
  private refreshCategory: any;
  private refreshSearchQuery: any;
  private category;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.initTopHeadlines("general");
    this.refreshCategory = this.dataSharingService
      .getCategory()
      .subscribe((res) => {
        this.initTopHeadlines(res);
      });
    this.refreshSearchQuery = this.dataSharingService
      .getSearchQuery()
      .subscribe((res) => {
        this.initTopHeadlines(this.category, res);
      });
  }
  private initTopHeadlines(category?: String, q?: String): void {
    this.category = category;
    const data = {
      category,
      q: q || "",
      page: 1,
      pageSize: 10,
    };
    this.apiService.getTopHeadline(data).subscribe(
      (res) => {
        if (res?.articles?.length) {
          this.topHeadlines = res?.articles;
        } else {
          this.notificationService.openErrorAlert(
            "Data is not availlable for the requested query",
            "No Data Found"
          );
        }
      },
      (error) => {
        this.notificationService.openErrorAlert(error?.error?.message, error?.error?.code);
      }
    );
  }
  public readMore(url: string): void {
    window.open(url);
  }
  public ngOnDestroy(): void {
    this.refreshCategory?.unsubscribe();
    this.refreshSearchQuery?.unsubscribe();
  }
}
