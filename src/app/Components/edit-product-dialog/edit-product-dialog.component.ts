import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { productDTO } from 'src/app/models/productDTO';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {

 
  form: FormGroup;
  disabledProc: boolean = false;

  producto : productDTO;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    private _ProductServicesService: ProductService,
    private _toastrService: ToastrService) { 

    this.form = new FormGroup({
      cProductName: new FormControl('', Validators.required),
      nPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
      nStock: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {
    this.GetProductById();
  }

  CargarDataForm(){

    // console.log(this.usuario)

    this.form.setValue({
      cProductName: this.producto.cProductName,
      nPrice: this.producto.nPrice,
      nStock: this.producto.nStock
    })

  }

  GetProductById()
  {
    this._ProductServicesService.getProductById(this.data.idProducto).subscribe(
      (product:any) => {
        this.producto = product

        this.CargarDataForm();
    });
  }

  editProduct() {

    this.disabledProc = true;


      this._ProductServicesService.editProduct({id: this.data.idProducto, ...this.form.value}).subscribe(
        result => {
          console.log(result);
          this.disabledProc = false;

          if(result)
          {
            this._toastrService.success('Actualizacion exitosa', 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }
        },
        err => {
          // console.log(err);
          this.disabledProc = false;

          if (err.status == 200)
          {
            this._toastrService.success('Actualizacion exitosa', 'Reto tecnico', {
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

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
