import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import jsPDF from 'jspdf'; 'jspdf'
import autoTable from 'jspdf-autotable'; 'jspdf-autotable';
import { recursosPublicaciones } from '../../recursos/interfaz';
import { AlertifyService } from 'src/app/recursos/alertify.service';

@Component({
  selector: 'app-analista-reporte',
  templateUrl: './analista-reporte.component.html',
  styleUrls: ['./analista-reporte.component.css']
})
export class AnalistaReporteComponent implements OnInit {
  private mr: any;
  public vecUsuarios: Array<any>; public buscar: string = 'L'; public verbuscar = ''; public fechaIni = ''; public fechaFin = '';
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecUsuarios = []; }

  ngOnInit() {
    //this.verCargasArticulos();
  }
  //VER LOS ARCHIVOS CARGADOS
  async generarReporte() {
    this.swPublicacion.getUsuarios(36, this.buscar == '0' ? this.verbuscar : this.buscar, this.fechaIni, this.fechaFin, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecUsuarios = data.usuario;
        this.cerrarModal();
      }
      else
        this.alerti.error('No se encontraron resultados');
    })
  }
  //ABRIR UN MODAL
  modalAddRol(nombModal: any) {
    this.mr = this.modalService.open(nombModal);
  }
  //CERTIFICADO DE CONTRATO
  generarPDFReporte() {
    var imgData = recursosPublicaciones.imagenBase64Poli;
    let nomCertificado = this.buscar == 'L' ? 'LIBROS' : this.buscar == 'RR' ? 'ARTÍCULOS REGIONALES' : this.buscar == 'C' ? 'ARTÍCULOS DE CONGRESOS' :
      this.buscar == 'RC' ? 'REVISTAS DE IMPACTO' : this.buscar == '0' ? 'POR AUTOR' : '';
    let vecAdd: any[] = [];

    for (let objRep of this.vecUsuarios) {
      vecAdd.push([objRep.strCodigoArticulo, objRep.strNombreArticulo, objRep.dateFechaPublicacion.split('T')[0], objRep.nombAutor + ' ' + objRep.apAutor,
      objRep.nombObra]);
    }

    const doc = new jsPDF('p', 'mm', 'letter');
    doc.addImage(imgData, 13, 1, 85, 30)
    doc.setFont("bolditalic", "bold");
    doc.setFontSize(11);
    doc.text('Reporte de publicaciones: ' + nomCertificado + '; fecha de consulta desde: ' + this.fechaIni + ' hasta: ' + this.fechaFin, 13, 40);
    doc.setFontSize(11);
    doc.text('Total de publicaciones: ' + this.vecUsuarios.length, 13, 45);


    autoTable(doc, {
      margin: { top: 49 },
      headStyles: { halign: 'center' },
      bodyStyles: { fontSize: 10 },
      head: [['Código', 'Titulo', 'Fecha de Publicacion', 'Autor', 'Tipo de obra']],
      body: vecAdd,
    })
    doc.save('Reporte.pdf');
  }
  cerrarModal() {
    this.mr.close();
  }

}
