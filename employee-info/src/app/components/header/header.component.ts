import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header: string = '';
  currentUrl: string = '';

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentUrl = this.location.path();
  }
  
  ngOnInit(): void {
    
    // this.activatedRoute.url.subscribe((x) => {
    //   this.currentUrl = this.router.url;
    //   switch(this.currentUrl.split('/')[2]) {
    //     case "list":
    //       this.header = "Employee List";
    //       break;
    //     case "create":
    //       this.header = "Create Employee";
    //       break;
    //     case "edit":
    //       this.header = "Edit Employee";
    //       break;
    //     default:
    //       this.header = "Employee List"
    //       break;
    //   }
    //   console.log(this.header)
    // })

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe({
      next: (event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        switch(this.currentUrl.split('/')[2]) {
          case "list":
            this.header = "Employee List";
            break;
          case "create":
            this.header = "Add Employee Details";
            break;
          case "edit":
            this.header = "Edit Employee";
            break;
          default:
            this.header = "Employee List"
            break;
        }
      },
      error: (err) => console.error('Error in navigation events subscription', err)
    });
    
  }

}
