import { Component, OnInit } from '@angular/core';
import { MatrizMonitorService } from '../../services/matriz-monitor.service';
import {MatrizMonitor} from '../../model/MatrizMonitor';

import {Entidad} from '../../model/entidad';
import {EntidadService} from '../../services/entidad.service';
import {TipoEntidad} from '../../model/tipoEntidad';
import { EntidadBusqueda } from 'src/app/model/entidadBusqueda';
import { EntidadResumen } from 'src/app/model/entidadResumen';
import { FileDetector } from 'selenium-webdriver/remote';

@Component({
  selector: 'app-matriz-monitor',
  templateUrl: './matriz-monitor.component.html',
  styleUrls: ['./matriz-monitor.component.css']
})
export class MatrizMonitorComponent implements OnInit {

  arrayMatrizMonitor: Array<MatrizMonitor>;
  arrayEntidades: Array<Entidad>;
  arrayTipoEntidades:Array<TipoEntidad> = new Array();
  arrayOtrasEntidades:Array<TipoEntidad> //= new Array();
  arrayEntidadResumen: Array<EntidadResumen> = new Array()
  
  entidadResumen: EntidadResumen 
  entidadBus: EntidadBusqueda = new EntidadBusqueda()

  isLoading = false;
 
  cBlindar: String = "#f79646"
  cFidelizar: String = "#d0eafa"
  cVigilarCar: String = "#8db4e2"
  cPrevenir: String = "#d8e4bc"
  cMejorar: String = "#fde9d9"
  cVigilarCob: String = "#c4bd97"
  cCostoBen: String = "#fabf8f"

  fecha: String
  selEnt: String
  selTipEnt: String
  selOtrEnt: String

  constructor(public _matrizMonitor: MatrizMonitorService, public _entidadService: EntidadService) { }
  

  ngOnInit() { 
      this._entidadService.getEntidades()
    .subscribe((data) => {
      this.arrayEntidades = data[0];
      this.arrayEntidades.forEach(ent => {
        var existe = false;
        if(this.arrayTipoEntidades)
          this.arrayTipoEntidades.forEach( tipEnt => {
            if(ent.TipoEntidad === tipEnt.TipoEntidad)
              existe = true;
          })
        if(!existe)
          this.arrayTipoEntidades.push(new TipoEntidad(ent.cTipoEntidad, ent.TipoEntidad));
      })
    }, err => {
      console.log(err);
    });      
  }

  onChange_fecha(event: any){
    this.fecha = event.target.value
  }

  onChange_selEnt(event: any){
    this.selEnt = event.target.value
  }

  onChange_cargaOEF(){
    //console.log(this.entidadBus.cTipoEntidad);
    if (this.entidadBus.cTipoEntidad != "0" && this.entidadBus.cEntidad != "0"){
      this.arrayOtrasEntidades = new Array();
      this.arrayEntidades.forEach(ent => {
        if (ent.cTipoEntidad == this.entidadBus.cTipoEntidad && this.entidadBus.cEntidad != ent.cEntidadFinanciera)
          this.arrayOtrasEntidades.push(ent)
      })
    }
  }

  download(color: any){
    console.log("function called"+color);
  }

  agregarResumen(){
    this.arrayEntidadResumen = new Array()
    let nBliCli: number = 0
    let nBliDeuda: number = 0
    
    let nMejCli: number = 0
    let nMejDeuda: number = 0
    
    let nFidCli: number = 0
    let nFidDeuda: number = 0
    
    let nVigCarCli: number = 0
    let nVigCarDeuda: number = 0
    
    let nVigCobCli: number = 0
    let nVigCobDeuda: number = 0
    
    let nCosBenCli: number = 0
    let nCosBenDeuda: number = 0
    
    let nPreCli: number = 0
    let nPreDeuda: number = 0

    this.arrayMatrizMonitor.forEach(monitor => {
      if (monitor.excluCod != ""){
        if ("R0C1|R1C1|R2C1".search(monitor.excluCod.toString()) >= 0 ){
          nBliCli += monitor.excluCli
          nBliDeuda += monitor.excluSal
        }
      
        if ("R3C1|R4C1".search(monitor.excluCod.toString()) >= 0 ){
          nMejCli += monitor.excluCli
          nMejDeuda += monitor.excluSal
        }

        if ("R0C2|R1C2|R0C3|R1C3".search(monitor.alDiaCod.toString()) >= 0 ){
          nFidCli += monitor.alDiaCli
          nFidDeuda += monitor.alDiaSal 
        }
        if ("R0C2|R1C2|R0C3|R1C3".search(monitor.men30Cod.toString())  >= 0 ){
          nFidCli += monitor.men30Cli
          nFidDeuda += monitor.men30Sal
        }

        if ("R2C2|R2C3|R0C4|R1C4|R2C4".search(monitor.alDiaCod.toString()) >= 0){
          nVigCarCli += monitor.alDiaCli
          nVigCarDeuda += monitor.alDiaSal 
        }
        if ("R2C2|R2C3|R0C4|R1C4|R2C4".search(monitor.men30Cod.toString()) >= 0){
          nVigCarCli += monitor.men30Cli
          nVigCarDeuda += monitor.men30Sal
        }
        if ("R2C2|R2C3|R0C4|R1C4|R2C4".search(monitor.men60Cod.toString()) >= 0){
          nVigCarCli += monitor.men60Cli
          nVigCarDeuda += monitor.men60Sal
        }

        if ("R0C5|R1C5|R2C5|R0C6|R1C6|R2C6".search(monitor.men90Cod.toString()) >= 0){
          nPreCli += monitor.men90Cli
          nPreDeuda += monitor.men90Sal
        }
        if ("R0C5|R1C5|R2C5|R0C6|R1C6|R2C6".search(monitor.may90Cod.toString()) >= 0){
          nPreCli += monitor.may90Cli
          nPreDeuda += monitor.may90Sal
        }

        if ("R3C2|R4C2|R3C3|R4C3|R3C4|R4C4".search(monitor.alDiaCod.toString()) >= 0){
          nVigCobCli += monitor.alDiaCli
          nVigCobDeuda += monitor.alDiaSal
        }
        if ("R3C2|R4C2|R3C3|R4C3|R3C4|R4C4".search(monitor.men30Cod.toString()) >= 0){
          nVigCobCli += monitor.men30Cli
          nVigCobDeuda += monitor.men30Sal
        }
        if ("R3C2|R4C2|R3C3|R4C3|R3C4|R4C4".search(monitor.men60Cod.toString()) >= 0){
          nVigCobCli += monitor.men60Cli
          nVigCobDeuda += monitor.men60Sal
        }

        if ("R3C5|R4C5|R3C6|R4C6".search(monitor.men90Cod.toString()) >= 0){
          nCosBenCli += monitor.men90Cli
          nCosBenDeuda += monitor.men90Sal
        }
        if ("R3C5|R4C5|R3C6|R4C6".search(monitor.may90Cod.toString()) >= 0){
          nCosBenCli += monitor.may90Cli
          nCosBenDeuda += monitor.may90Sal
        }


      }
    })

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R0C1|R1C1|R2C1"
    this.entidadResumen.color = this.cBlindar
    this.entidadResumen.accion = "Blindar Clientes"
    this.entidadResumen.clientes = nBliCli
    this.entidadResumen.clientesPor = (nBliCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nBliDeuda
    this.entidadResumen.deudaPor = (nBliDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R0C2|R1C2|R0C3|R1C3"
    this.entidadResumen.color = this.cFidelizar
    this.entidadResumen.accion = "Fidelizar Clientes"
    this.entidadResumen.clientes = nFidCli
    this.entidadResumen.clientesPor = (nFidCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nFidDeuda
    this.entidadResumen.deudaPor = (nFidDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R2C2|R2C3|R0C4|R1C4|R2C4"
    this.entidadResumen.color = this.cVigilarCar
    this.entidadResumen.accion = "Vigilar Cartera"
    this.entidadResumen.clientes = nVigCarCli
    this.entidadResumen.clientesPor = (nVigCarCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nVigCarDeuda
    this.entidadResumen.deudaPor = (nVigCarDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R0C5|R1C5|R2C5|R0C6|R1C6|R2C6"
    this.entidadResumen.color = this.cPrevenir
    this.entidadResumen.accion = "Prevenir Deterioro"
    this.entidadResumen.clientes = nPreCli
    this.entidadResumen.clientesPor = (nPreCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nPreDeuda
    this.entidadResumen.deudaPor = (nPreDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R3C1|R4C1"
    this.entidadResumen.color = this.cMejorar
    this.entidadResumen.accion = "Mejorar Cobranza"
    this.entidadResumen.clientes = nMejCli
    this.entidadResumen.clientesPor = (nMejCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nMejDeuda
    this.entidadResumen.deudaPor = (nMejDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R3C2|R4C2|R3C3|R4C3|R3C4|R3C4"
    this.entidadResumen.color = this.cVigilarCob
    this.entidadResumen.accion = "Vigilar Cobranza"
    this.entidadResumen.clientes = nVigCobCli
    this.entidadResumen.clientesPor = (nVigCobCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nVigCobDeuda
    this.entidadResumen.deudaPor = (nVigCobDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = "R3C5|R4C5|R3C6|R4C6"
    this.entidadResumen.color = this.cCostoBen
    this.entidadResumen.accion = "Costo/Beneficio"
    this.entidadResumen.clientes = nCosBenCli
    this.entidadResumen.clientesPor = (nCosBenCli/(nBliCli + nFidCli + nVigCarCli + nVigCobCli + nPreCli + nMejCli + nCosBenCli))*100.00
    this.entidadResumen.deuda = nCosBenDeuda
    this.entidadResumen.deudaPor = (nCosBenDeuda/(nBliDeuda + nFidDeuda + nVigCarDeuda + nVigCobDeuda + nPreDeuda + nMejDeuda + nCosBenDeuda))*100.00
    this.arrayEntidadResumen.push(this.entidadResumen)

    this.entidadResumen = new EntidadResumen()
    this.entidadResumen.cod = ""
    this.entidadResumen.color = ""
    this.entidadResumen.accion = ""
    this.entidadResumen.clientes = this.arrayEntidadResumen.reduce((sum,current) => sum + current.clientes,0)
    this.entidadResumen.clientesPor = this.arrayEntidadResumen.reduce((sum,current) => sum + current.clientesPor,0)
    this.entidadResumen.deuda = this.arrayEntidadResumen.reduce((sum,current) => sum + current.deuda,0)
    this.entidadResumen.deudaPor = this.arrayEntidadResumen.reduce((sum,current) => sum + current.deudaPor,0)
    this.arrayEntidadResumen.push(this.entidadResumen)

  }

  procesarReporte(){
    this.isLoading = true
    this.arrayMatrizMonitor = null
    this._matrizMonitor.getMatrizMonitor(this.entidadBus)
        .subscribe((data) => {
          this.arrayMatrizMonitor = data[0];
          this.arrayMatrizMonitor.forEach(mMonitor => {
          
          if(mMonitor.grupo == "0") mMonitor.cGrupo = "Entidad";
          else mMonitor.cGrupo = "Otras EF";

          if(mMonitor.rango == "0") mMonitor.cRango = "Al Dia"
          if(mMonitor.rango == "1") mMonitor.cRango = "1 a 30"
          if(mMonitor.rango == "2") mMonitor.cRango = "31 a 60"
          if(mMonitor.rango == "3") mMonitor.cRango = "61 a 90"
          if(mMonitor.rango == "4") mMonitor.cRango = "más de 90"
        
          if(mMonitor.excluCod == "R0C1") mMonitor.excluColor = this.cBlindar
          if(mMonitor.excluCod == "R1C1") mMonitor.excluColor = this.cBlindar
          if(mMonitor.excluCod == "R2C1") mMonitor.excluColor = this.cBlindar
    
          if(mMonitor.excluCod == "R3C1") mMonitor.excluColor = this.cMejorar
          if(mMonitor.excluCod == "R4C1") mMonitor.excluColor = this.cMejorar
        
          if(mMonitor.alDiaCod == "R0C2") mMonitor.alDiaColor = this.cFidelizar
          if(mMonitor.alDiaCod == "R1C2") mMonitor.alDiaColor = this.cFidelizar
          if(mMonitor.men30Cod == "R0C3") mMonitor.men30Color = this.cFidelizar    
          if(mMonitor.men30Cod == "R1C3") mMonitor.men30Color = this.cFidelizar

          if(mMonitor.alDiaCod == "R2C2") mMonitor.alDiaColor = this.cVigilarCar
          if(mMonitor.men30Cod == "R2C3") mMonitor.men30Color = this.cVigilarCar
          if(mMonitor.men60Cod == "R0C4") mMonitor.men60Color = this.cVigilarCar
          if(mMonitor.men60Cod == "R1C4") mMonitor.men60Color = this.cVigilarCar
          if(mMonitor.men60Cod == "R2C4") mMonitor.men60Color = this.cVigilarCar

          if(mMonitor.alDiaCod == "R3C2") mMonitor.alDiaColor = this.cVigilarCob
          if(mMonitor.alDiaCod == "R4C2") mMonitor.alDiaColor = this.cVigilarCob
          if(mMonitor.men30Cod == "R3C3") mMonitor.men30Color = this.cVigilarCob
          if(mMonitor.men30Cod == "R4C3") mMonitor.men30Color = this.cVigilarCob
          if(mMonitor.men60Cod == "R3C4") mMonitor.men60Color = this.cVigilarCob
          if(mMonitor.men60Cod == "R4C4") mMonitor.men60Color = this.cVigilarCob

          if(mMonitor.men90Cod == "R3C5") mMonitor.men90Color = this.cCostoBen
          if(mMonitor.men90Cod == "R4C5") mMonitor.men90Color = this.cCostoBen
          if(mMonitor.may90Cod == "R3C6") mMonitor.may90Color = this.cCostoBen
          if(mMonitor.may90Cod == "R4C6") mMonitor.may90Color = this.cCostoBen
          
          if(mMonitor.men90Cod == "R0C5") mMonitor.men90Color = this.cPrevenir
          if(mMonitor.men90Cod == "R1C5") mMonitor.men90Color = this.cPrevenir
          if(mMonitor.men90Cod == "R2C5") mMonitor.men90Color = this.cPrevenir
          if(mMonitor.may90Cod == "R0C6") mMonitor.may90Color = this.cPrevenir
          if(mMonitor.may90Cod == "R1C6") mMonitor.may90Color = this.cPrevenir
          if(mMonitor.may90Cod == "R2C6") mMonitor.may90Color = this.cPrevenir

          mMonitor.totEntCli = mMonitor.comunCli + mMonitor.excluCli
          mMonitor.comunPorCli = (mMonitor.comunCli / (mMonitor.comunCli + mMonitor.excluCli)) * 100.00
          mMonitor.excluPorCli = (mMonitor.excluCli / (mMonitor.comunCli + mMonitor.excluCli)) * 100.00
          mMonitor.alDiaPorCli = (mMonitor.alDiaCli / mMonitor.comunCli) * 100.00
          mMonitor.men30PorCli = (mMonitor.men30Cli / mMonitor.comunCli) * 100.00
          mMonitor.men60PorCli = (mMonitor.men60Cli / mMonitor.comunCli) * 100.00
          mMonitor.men90PorCli = (mMonitor.men90Cli / mMonitor.comunCli) * 100.00
          mMonitor.may90PorCli = (mMonitor.may90Cli / mMonitor.comunCli) * 100.00
          mMonitor.totEntPorCli = (mMonitor.totEntCli / (mMonitor.totEntCli + mMonitor.totOtrCli)) * 100.00
          mMonitor.totOtrPorCli = (mMonitor.totOtrCli / (mMonitor.totEntCli + mMonitor.totOtrCli)) * 100.00

          mMonitor.totEntSal = mMonitor.comunSal + mMonitor.excluSal
          mMonitor.comunPorSal = (mMonitor.comunSal / (mMonitor.comunSal + mMonitor.excluSal)) * 100.00
          mMonitor.excluPorSal = (mMonitor.excluSal / (mMonitor.comunSal + mMonitor.excluSal)) * 100.00
          mMonitor.alDiaPorSal = (mMonitor.alDiaSal / mMonitor.comunSal) * 100.00
          mMonitor.men30PorSal = (mMonitor.men30Sal / mMonitor.comunSal) * 100.00
          mMonitor.men60PorSal = (mMonitor.men60Sal / mMonitor.comunSal) * 100.00
          mMonitor.men90PorSal = (mMonitor.men90Sal / mMonitor.comunSal) * 100.00
          mMonitor.may90PorSal = (mMonitor.may90Sal / mMonitor.comunSal) * 100.00
          mMonitor.totEntPorSal = (mMonitor.totEntSal / (mMonitor.totEntSal + mMonitor.totOtrSal)) * 100.00
          mMonitor.totOtrPorSal = (mMonitor.totOtrSal / (mMonitor.totEntSal + mMonitor.totOtrSal)) * 100.00
        });
          this.agregarResumen()
          //console.log(data[0]);
          this.isLoading = false
        },err => {
          console.log(err);
        });
    this.entidadBus = new EntidadBusqueda()
    
  }
}
