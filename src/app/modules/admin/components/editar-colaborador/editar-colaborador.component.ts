import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/service/colaborador.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})

export class EditarColaboradorComponent implements OnInit{
  public form: FormGroup;
  public sucursales: any;
  public idParam: any;

  constructor (private fb: FormBuilder,
    private activeR: ActivatedRoute, 
    private router: Router,
    private http: ColaboradorService,
    private toastr: ToastrService ){
    //Capturar - rescatar el parametro pasado por la url
    this.idParam=this.activeR.snapshot.paramMap.get('id');

    //llamar al servicio datos empleado - pasando el parametro capturado por url
    this.http.consultarIdEmpleado(this.idParam).subscribe({
      next: (resultData) => {
        //asignar valor a los campos correspondientes al fomulario
        this.form.setValue({
          nombre:resultData [0]['nombre'],
          apPaterno:resultData [0]['apPaterno'],
          apMaterno:resultData [0]['apMaterno'],
          rfc:resultData [0]['rfc'],
          Gimnasio_idGimnasio:resultData [0]['Gimnasio_idGimnasio'],
          turnoLaboral:resultData [0]['turnoLaboral'],
          salario:resultData [0]['salario'],
          email:resultData [0]['email']
        });
      }
    });

    //asignar validaciones a los campos de fomulario
    this.form = this.fb.group({
      nombre: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apPaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apMaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      rfc: ['', Validators.compose([ Validators.required, Validators.pattern(/^[A-Za-zñÑ&]{1,2}([A-Za-zñÑ&]([A-Za-zñÑ&](\d(\d(\d(\d(\d(\d(\w(\w(\w)?)?)?)?)?)?)?)?)?)?)?$/)])],
      Gimnasio_idGimnasio: ['', Validators.compose([ Validators.required])],
      turnoLaboral: ['', Validators.compose([ Validators.required])],
      salario: ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])]
    });
  }

  //insanciar objeto para manejar el tipo de error en las validaciones
  matcher = new MyErrorStateMatcher();

  //mandar a llamar el sevicio correspondiente al llenado del combo sucursal
  ngOnInit():void{
    this.http.comboDatosGym().subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.sucursales = resultData;
      }
    })
  }

  //funcion correspondiente a actualizar empleado
  actualizar(){
    console.log(this.form.value);
    this.http.actualizaEmpleado(this.idParam, this.form.value).subscribe({
      next: (resultDataUpdate) => {
        console.log(resultDataUpdate.msg);
        if(resultDataUpdate.msg == 'RfcExists'){
          this.toastr.error('El rfc ya existe.', 'Error!!!');
        }
        if(resultDataUpdate.msg == 'MailExists'){
          this.toastr.error('El correo ya existe.', 'Error!!!');
        }
        if(resultDataUpdate.msg == 'Success'){
          this.toastr.success('Registro actualizado correctamente.', 'Exíto!!!');
          this.form.reset();  
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  
}
