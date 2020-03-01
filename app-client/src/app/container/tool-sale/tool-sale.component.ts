import { NzMessageService } from 'ng-zorro-antd/message';
import { VipService } from './../../service/vip/vip.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tool-sale',
  templateUrl: './tool-sale.component.html',
  styleUrls: ['./tool-sale.component.scss']
})
export class ToolSaleComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private vipSV: VipService,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name_card: [null, [Validators.required]],
      landding_page: [null, [Validators.required, Validators.email]],
      note: ['']
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.vipSV.requestCreateVIP(this.validateForm.value).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', 'yêu cầu tạo VIP thành công!');
        } else {
          this.message.create('error', r && r.message ? r.message : 'Có lổi xẩy ra. Vui lòng thử lại sau!');
        }
      })
    }
  }
}
