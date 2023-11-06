import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { franquiciaService } from 'src/app/service/franquicia.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { horarioService } from 'src/app/service/horario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sucursal-editar',
  templateUrl: './sucursal-editar.component.html',
  styleUrls: ['./sucursal-editar.component.css']
})
export class SucursalEditarComponent implements OnInit {
  formularioSucursales: FormGroup;
  gimnasio: any;
  franquicia: any;
  elID: any;
  message: string = '';


  constructor(
    private formulario: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private gimnasioService: GimnasioService,
    public dialog: MatDialog,
    private franquiciaService: franquiciaService,
    private HorarioService: horarioService,
  ) {
  
    this.elID = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
   


    this.formularioSucursales = this.formulario.group({
     nombreGym: ["", Validators.required],
      telefono:  ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      tipo: ["", Validators.required],
      Franquicia_idFranquicia: ["", Validators.required],
      horarios: this.formulario.group({
        lunes: ["Lunes"],
        horaInicioLunes: { value: ''},
        horaFinLunes: { value: '', disabled: true },
        martes: ["Martes"],
        horaIniciomartes: { value: '', disabled: true },
        horaFinmartes: { value: '', disabled: true },
        miercoles: ["Miercoles"],
        horaIniciomiercoles: { value: '', disabled: true },
        horaFinmiercoles: { value: '', disabled: true },
        jueves: ["Jueves"],
        horaIniciojueves: { value: '', disabled: true },
        horaFinjueves: { value: '', disabled: true },
        viernes: ["Viernes"],
        horaInicioviernes: { value: '', disabled: true },
        horaFinviernes: { value: '', disabled: true },
        sabado: ["Sabado"],
        horaIniciosabado: { value: '', disabled: true },
        horaFinsabado: { value: '', disabled: true },
        domingo: ["Domingo"],
        horaIniciodomingo: { value: '', disabled: true },
        horaFindomingo: { value: '', disabled: true }
        
      }),
      casilleros: ["", Validators.required],
      estacionamiento: ["", Validators.required],
      energia: ["", Validators.required],
      bicicletero: ["", Validators.required],
      codigoPostal: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
      colonia: ["", Validators.required],
      calle: ["", Validators.required],
      numExt: ["", Validators.required],
      numInt: ["", Validators.required],
    });
   
  }

  idGimnasio: any;
  jsonPaths: string[] = [
    '$.horarios.lunes.horaInicio',
    '$.horarios.lunes.horaFin',
    '$.horarios.martes.horaInicio',
    '$.horarios.martes.horaFin',
    '$.horarios.miercoles.horaInicio',
    '$.horarios.miercoles.horaFin',
    '$.horarios.jueves.horaInicio',
    '$.horarios.jueves.horaFin',
    '$.horarios.viernes.horaInicio',
    '$.horarios.viernes.horaFin',
    '$.horarios.sabado.horaInicio',
    '$.horarios.sabado.horaFin',
    '$.horarios.domingo.horaInicio',
    '$.horarios.domingo.horaFin',
  ];

  valorJSON: { [key: string]: any } = {};

  ngOnInit(): void {

    this.franquiciaService.obternerFran().subscribe((respuesta) => {
      console.log(respuesta);
      if (Array.isArray(respuesta)) {
        this.franquicia = respuesta.map((dato) => ({
          value: dato.idFranquicia, // Valor que se enviará al seleccionar
          label: dato.nombre, // Etiqueta que se mostrará en el combo
        }));
      } else {
        console.error('La respuesta no es un arreglo.');
      }
    });

    console.log("si")
    const observables = this.jsonPaths.map(jsonPath => this.HorarioService.getValorJSON(jsonPath, this.elID));
    console.log("si")
    console.log("ob"+observables);

    forkJoin(observables).subscribe(dataArray => {
      console.log("valorjson");
      dataArray.forEach((data, index) => {
        console.log(`Data para jsonPath[${index}]:`, data);
        console.log(`Data para jsonPath[${index}]:`, data);
        console.log(`Valor de $.horarios.martes.horaInicio:`, data.ValorJSON);
        console.log("areee $.horarios.viernes.horaInicio:", this.valorJSON['$.horarios.viernes.horaInicio']);
        console.log("antonio"+this.valorJSON['$.horarios.sabado.horaInicio'])

        if (this.jsonPaths[index] === '$.horarios.viernes.horaInicio') {
          console.log(`Valoooooor de $.horarios.viernes.horaInicio:`, data.ValorJSON);
        }
        console.log("este data"+data)
        console.log("valorjson"+data.ValorJSON);
        this.valorJSON[this.jsonPaths[index]] = data.ValorJSON;
        console.log("valorjson"+data.ValorJSON);
        console.log("valorjson"+this.jsonPaths[index]);
      });
      
    });
    console.log("AQUIIII"+'$.horarios.lunes.horaInicio');

    this.gimnasioService.consultarPlan(this.elID).subscribe(
      (respuesta) => {
        this.formularioSucursales.setValue({
          nombreGym: respuesta[0]['nombreGym'],
          estado: respuesta[0]['estado'],
          ciudad: respuesta[0]['ciudad'],
          colonia: respuesta[0]['colonia'],
          calle: respuesta[0]['calle'],
          codigoPostal: respuesta[0]['codigoPostal'],
          numExt: respuesta[0]['numExt'],
          numInt: respuesta[0]['numInt'],
          telefono: respuesta[0]['telefono'],
          tipo: respuesta[0]['tipo'],
          Franquicia_idFranquicia: respuesta[0]['Franquicia_idFranquicia'],
          casilleros: respuesta[0]['casilleros'],
          estacionamiento: respuesta[0]['estacionamiento'],
          energia: respuesta[0]['energia'],
          bicicletero: respuesta[0]['bicicletero'],
          horarios: {
            horaInicioLunes: this.valorJSON['$.horarios.Lunes.horaInicio'],
            horaFinLunes: this.valorJSON['$.horarios.lunes.horaInicio'],
            martes: this.valorJSON['$.horarios.martes.horaInicio'],
            horaInicioMartes: this.valorJSON['$.horarios.martes.horaInicio'],
            horaFinmartes: respuesta[0]['horarios']['horaFinmartes'],
            miercoles: respuesta[0]['horarios']['Miercoles'],
            horaIniciomiercoles: respuesta[0]['horarios']['horaIniciomartes'],
            horaFinmiercoles: respuesta[0]['horarios']['horaFinmartes'],
            jueves: respuesta[0]['horarios']['Jueves'],
            horaIniciojueves: respuesta[0]['horarios']['horaIniciomartes'],
            horaFinjueves: respuesta[0]['horarios']['horaFinmartes'],
            viernes: respuesta[0]['horarios']['viernes'],
            horaInicioviernes: respuesta[0]['horarios']['horaIniciomartes'],
            horaFinviernes: respuesta[0]['horarios']['horaFinmartes'],
            sabado: respuesta[0]['horarios']['Sabado'],
            horaIniciosabado: respuesta[0]['horarios']['horaIniciomartes'],
            horaFinsabado: respuesta[0]['horarios']['horaFinmartes'],
            domingo: respuesta[0]['horarios']['Domingo'],
            horaIniciodomingo: respuesta[0]['horarios']['horaIniciomartes'],
            horaFindomingo: respuesta[0]['horarios']['horaFinmartes'],
          },
         
        });
        
      }
    );

    console.log("otra prueba"+this.valorJSON['$.horarios.lunes.horaInicio'],);
  }

  actualizar() {
    this.gimnasioService.actualizarPlan(this.elID, this.formularioSucursales.value).subscribe(() => {
      this.dialog.open(MensajeEmergentesComponent, {
        data: 'Membresía actualizada exitosamente',
      })
        .afterClosed()
        .subscribe((cerrarDialogo: Boolean) => {
          if (cerrarDialogo) {
            this.router.navigateByUrl('/gimasioLista');
          } else {
            // Hacer algo si el diálogo no se cierra
          }
        });
    });
  }
  
  funciones(event: MatCheckboxChange, horaInicioControlName: string, horaFinControlName: string) {
    const checkbox = event.checked;
    const horaInicio = this.formularioSucursales.get(`horarios.${horaInicioControlName}`);
    const horaFin = this.formularioSucursales.get(`horarios.${horaFinControlName}`);

    if (checkbox) {
      horaInicio?.enable();
      horaFin?.enable();
      console.log(`${horaInicioControlName} habilitado`);
    } else {
      horaInicio?.disable();
      horaFin?.disable();
      console.log(`${horaInicioControlName} deshabilitado`);
    }
  }
}
