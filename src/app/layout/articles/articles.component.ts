import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articleList = [];
  private refreshCategory: any;
  private pageCount = 1;
  private isFetching = false;
  private category = new String("general");
  private refreshSearchQuery: any;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    document.addEventListener("scroll", () => {
      this.onScroll();
    });
    this.refreshCategory = this.dataSharingService
      .getCategory()
      .subscribe((res) => {
        this.pageCount = 1;
        this.category = res;
        this.articleList = [];
        this.initTopHeadlines(res);
      });
    this.refreshSearchQuery = this.dataSharingService
      .getSearchQuery()
      .subscribe((res) => {
        this.pageCount = 1;
        this.articleList = [];
        this.category = this.category + " AND " + res;
        this.initTopHeadlines(this.category);
      });
    this.initTopHeadlines("general");
  }
  private initTopHeadlines(q?: String): void {
    const data = {
      q,
      page: this.pageCount,
      pageSize: 8,
    };
    this.isFetching = true;
    this.apiService.getArticles(data).subscribe(
      (res) => {
        if (res?.articles?.length) {
          this.articleList = this.articleList.concat(res?.articles);
          this.isFetching = false;
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
    if (this.pageCount === 10) {
      this.pageCount = 0;
    }
    this.pageCount++;
  }
  public readMore(url: string): void {
    window.open(url);
  }
  public onScroll() {
    if (
      window.innerHeight + window.pageYOffset + 100 >=
        document.body.offsetHeight &&
      !this.isFetching
    ) {
      this.initTopHeadlines(this.category);
    }
  }
  public ngOnDestroy(): void {
    this.refreshCategory?.unsubscribe();
    this.refreshSearchQuery?.unsubscribe();
  }
}
