import { NzMessageService } from 'ng-zorro-antd/message';
import { VipService } from './../../service/vip/vip.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-register-vip',
  templateUrl: './register-vip.component.html',
  styleUrls: ['./register-vip.component.scss']
})
export class RegisterVipComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private vipSV: VipService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      email_transaction: [null, [Validators.required, Validators.email]],
      username_transaction: [null, [Validators.required]],
      note: ['']
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      this.modalService.confirm({
        nzTitle: 'Xác nhận',
        nzContent: 'Bạn đã thanh toán phí Partners?',
        nzOkText: 'Xác nhận',
        nzCancelText: 'Đóng',
        nzOnOk: () => { this.requestCreateVIP(this.validateForm.value) }
      });
    }
  }

  requestCreateVIP(request) {
    this.vipSV.requestCreateVIP(request).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'yêu cầu tạo VIP thành công!');
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lổi xẩy ra. Vui lòng thử lại sau!');
      }
    })
  }
}
