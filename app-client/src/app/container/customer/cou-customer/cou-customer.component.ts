import { NzMessageService } from 'ng-zorro-antd';
import { CustomerService } from './../../../service/customer/customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-cou-customer',
  templateUrl: './cou-customer.component.html',
  styleUrls: ['./cou-customer.component.scss']
})
export class CouCustomerComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';
  inputValue: string;
  options: string[] = [];
  API_IMG = '';
  avatar = [];

  constructor(
    private customerSV: CustomerService,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {

    this.API_IMG = environment.APICURRENTSERVE;
    this.validateForm = this.fb.group({
      fullname: [this.dataEdit.fullname ? this.dataEdit.fullname : null, [Validators.required]],
      phone: [this.dataEdit.phone ? this.dataEdit.phone : ''],
      email: [this.dataEdit.email ? this.dataEdit.phone : null, [Validators.required]],
      transaction_code: [this.dataEdit.transaction_code ? this.dataEdit.transaction_code : null, [Validators.required]],
      username_telegram: [this.dataEdit.username_telegram ? this.dataEdit.username_telegram : null],
      price_transaction: [this.dataEdit.username_telegram ? this.dataEdit.username_telegram : 0],
      note: [null],
      active: [this.dataEdit.active ? this.dataEdit.active : true],
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {

      let client = this.validateForm.value;
      client = { ...this.dataEdit, ...client };
      
      this.customerSV.updateOrCreateCustomer(client).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo khách hàng thành công!');
          this.handleCancel();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });
    }
  }

}
