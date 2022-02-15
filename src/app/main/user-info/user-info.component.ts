import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  links = ['heroes', 'history', 'powerups'];
  activeLink = this.links[0];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const url = this.router.routerState.snapshot.url;
    const activeLink = url.split('/')[2];
    if (!activeLink) {
      return;
    }
    this.activeLink = this.links[this.links.indexOf(activeLink) || 0];
  }
}
