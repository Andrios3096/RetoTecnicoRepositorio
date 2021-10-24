import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  disabledProc: boolean = false;

  constructor(private _ProductServicesService: ProductService,
    private _toastrService: ToastrService,
    private _router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      cProductName: new FormControl('', Validators.required),
      nPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
      nStock: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  addProduct() {

    this.disabledProc = true;

      this._ProductServicesService.addProduct(this.form.value).subscribe(
        result => {
          console.log(result);

          if(result)
          {
            this.disabledProc = false;

            this._toastrService.success('Registro exitoso', 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }

        },
        err => {

          this.disabledProc = false;

          if (err.status == 200)
          {
            this._toastrService.success('Registro exitoso', 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }
          else{
            this._toastrService.error(err.error, 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }

        }
      );

      this.goTo()
    }

    goTo()
    {
      this._router.navigate([""])
    }
  
  

}
