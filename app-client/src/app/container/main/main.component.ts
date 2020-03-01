import { LoginService } from './../../service/auth/login.service';
import { MainService } from './../../service/main.service';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: any;
  public menus: any;
  public currentUrl: string;
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  // @ViewChild('trigger') customTrigger: TemplateRef<void>;

  // changeTrigger(): void {
  //   this.triggerTemplate = this.customTrigger;
  // }

  constructor(private router: Router, private globalData: GlobalDataService, private mainSV: MainService, private authSV: LoginService) {
  }

  ngOnInit() {
    this.menus = this.getMenu();
    this.currentUrl = this.router.url;
    this.getCurrentUser();

  }
  getCurrentUser() {
    this.authSV.getCurrentUser().subscribe(r => {
      if (r && r.status == 1) {
        this.user = r.data;
        this.mainSV.setCurrentUser(r.data);
      } else {
        this.mainSV.logOut();
      }
    })
  }

  getMenu() {
    return [
      {
        title: 'Trang chủ',
        url: '/manager/dashboard',
        role: 'admin',
        icon: 'home'
      },
      {
        title: 'Đăng ký VIP',
        url: '/manager/register-vip',
        role: 'admin',
        icon: 'crown'
      },
      {
        title: 'Công cụ sales',
        url: '/manager/register-sales',
        role: 'admin',
        icon: 'tool'
      },
      {
        title: 'Khách đào tạo',
        url: '',
        role: 'user',
        icon: 'usergroup-add',
        subMenu: [
          {
            title: 'Danh sách khách',
            url: '/manager/customers',
            role: 'user',
          }, {
            title: 'Chuyển khách',
            url: '/manager/tranfer-customers',
            role: 'admin'
          }
        ]
      },
      {
        title: 'Người dùng',
        url: '',
        role: 'admin',
        icon: 'user',
        subMenu: [
          {
            title: 'Đối tác',
            url: '/manager/user',
            role: 'user',
          },
          {
            title: 'Gia hạn VIP',
            url: '/manager/user',
            role: 'user',
          }
        ]
      },

      {
        title: 'Liên hệ',
        url: '/manager/contact',
        role: 'admin',
        icon: 'phone'
      }
    ]
  }

  getSelected(url) {
    return url == this.currentUrl ? true : false;
  }

  getOpenSubMenu(item) {
    let hasItem = item.subMenu.find(e => { return e.url == this.currentUrl })
    return hasItem ? true : false;
  }

  logout() {
    this.mainSV.logOut();
  }
}
