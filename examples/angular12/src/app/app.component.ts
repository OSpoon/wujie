import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare global {
  interface Window {
    $wujie: {
      bus: any,
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular12';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 通知主应用当前自应用的路由已发生变化
        window.$wujie?.bus.$emit("sub-route-change", "angular12", event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    // 响应主应用下发的路由跳转事件
    window.$wujie?.bus.$on("angular12-router-change", (path: string) => {
      this.router.navigate([path])
    });
  }
}
