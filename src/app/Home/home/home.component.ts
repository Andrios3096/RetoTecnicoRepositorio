import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { productDTO } from 'src/app/models/productDTO';
import { ProductService } from 'src/app/services/product.service';
import {MatDialogConfig, MatDialog} from "@angular/material/dialog";
import { EditProductDialogComponent } from 'src/app/Components/edit-product-dialog/edit-product-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  matProducts: MatTableDataSource<productDTO>;

  displayedColumns: string[] = ['id', 'productName', 'price', 'stock', 'registrationDate', 'options'];

  form: FormGroup;
  dialogRef: any;


  constructor(private _ProductServicesService: ProductService,
    private _toastrService: ToastrService,
    public dialog: MatDialog) { 

    this.form = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      stock: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {
    this.GetProductAll();
  }

  applyFilter(filterValue: string) {

    this.matProducts.filter = filterValue.trim().toLowerCase();
  }

  GetProductAll()
  {
    this._ProductServicesService.getProductAll().subscribe(
      products => {
        console.log(products);

        this.matProducts = new MatTableDataSource(products)

    });
  }

  DeleteProduct(idProduct: string)
  {
      this._ProductServicesService.deleteProduct(idProduct).subscribe(
        result => {
          console.log(result);

          if(result)
          {
            this._toastrService.success('Eliminacion exitosa', 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }
        },
        err => {
          console.log(err);

          if (err.status == 200)
          {
            this._toastrService.success('Eliminacion exitosa', 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }else{
            this._toastrService.error(err.error, 'Reto tecnico', {
              positionClass: 'toast-bottom-right'
            });
          }
        }

      );

      this.GetProductAll();
  }

  openDialog(idProducto: string)
  {
    let _MatDialogConfig = new MatDialogConfig();
    _MatDialogConfig.data = {idProducto}
    _MatDialogConfig.autoFocus = false;
    _MatDialogConfig.width = 'auto';
    _MatDialogConfig.maxHeight = '70vh';
    _MatDialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(EditProductDialogComponent, _MatDialogConfig);


    this.dialogRef.afterClosed().subscribe(result => {
      this.GetProductAll();
    });
  }
}

