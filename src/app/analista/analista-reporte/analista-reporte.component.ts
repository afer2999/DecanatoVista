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
  private mr: any; public vecLineas: Array<any> = []; public intLinea = 0; public vecCarrera: Array<any> = []; public vecFacultad: Array<any> = [];
  public vecUsuarios: Array<any>; public buscar: string = 'L'; public verbuscar = ''; public fechaIni = ''; public fechaFin = ''; public repFac: any; public repCar: any;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecUsuarios = []; }

  ngOnInit() {
    this.verLineasInvestigacion()
  }
  async verLineasInvestigacion() {
    this.vecLineas = []; this.vecCarrera = []; this.vecFacultad = [];

    const resLinea = await new Promise<any>(resolve =>
      this.swPublicacion.getUsuarios(22, 'na', 'na', 'na', 'na', 'na').subscribe(translated => {
        resolve(translated)
      }));
    if (resLinea.success)
      this.vecLineas = resLinea.usuario;

    const resFacultad = await new Promise<any>(resolve => this.swPublicacion.getCarrerasMaster(1, 'na', 'na', 'na').subscribe(translated => { resolve(translated) }));
    if (resFacultad.success) {
      this.vecFacultad = resFacultad.carrera;
      this.verCarreraFacultad(this.vecFacultad[0].strCodigo);
      this.repFac = this.vecFacultad[0].strCodigo;
    }
  }
  async verCarreraFacultad(facultad: any) {
    const resCarrera = await new Promise<any>(resolve => this.swPublicacion.getCarrerasMaster(2, facultad, 'na', 'na').subscribe(translated => { resolve(translated) }));
    if (resCarrera.success) {
      this.vecCarrera = resCarrera.carrera;
      this.repCar = this.vecCarrera[0].codCarrera;
    }
  }
  verCarrerasVista() {
    this.verCarreraFacultad(this.repFac);
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
  generarReporteLinea() {
    this.swPublicacion.getUsuarios(361, this.intLinea, this.fechaIni, this.fechaFin, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecUsuarios = data.usuario;
        this.cerrarModal();
      }
      else
        this.alerti.error('No se encontraron resultados');
    })
  }
  generarReporteCarrera(){
    this.swPublicacion.getUsuarios(361, this.intLinea, this.fechaIni, this.fechaFin, 'na', 'na').subscribe((data: any) => {
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
    var pageNumber = 1; // Definir el contador de páginas fuera de la función



    let nomCertificado = this.buscar == 'L' ? 'LIBROS' : this.buscar == 'RR' ? 'ARTÍCULOS REGIONALES' : this.buscar == 'C' ? 'ARTÍCULOS DE CONGRESOS' :
      this.buscar == 'RC' ? 'REVISTAS DE IMPACTO' : this.buscar == '0' ? 'POR AUTOR' : '';
    let vecAdd: any[] = [];

    for (let objRep of this.vecUsuarios) {
      vecAdd.push([objRep.strCodigoArticulo, objRep.strNombreArticulo, objRep.dateFechaPublicacion.split('T')[0], objRep.nombAutor + ' ' + objRep.apAutor,
      objRep.nombObra]);
    }

    const doc = new jsPDF('p', 'mm', 'letter');
    const totalPages = doc.getNumberOfPages();
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    doc.addImage(imgData, 13, 1, 85, 30)
    doc.setFont("bolditalic", "bold");
    doc.setFontSize(11);
    doc.text('Reporte de publicaciones: ' + nomCertificado + '; fecha de consulta desde: ' + this.fechaIni + ' hasta: ' + this.fechaFin, 13, 40);
    doc.setFontSize(11);
    doc.text('Total de publicaciones: ' + this.vecUsuarios.length, 13, 45);

    autoTable(doc, {
      margin: { top: 60 },

      headStyles: { halign: 'center' },
      bodyStyles: { fontSize: 10 },
      styles: {
        lineColor: [0, 0, 0], // Color de línea
        lineWidth: 0.05 // Grosor de la línea
      },
      head: [['Código', 'Titulo', 'Fecha de Publicacion', 'Autor', 'Tipo de obra']],
      body: vecAdd,
      theme: 'plain',
      startY: 60,

    })




    doc.save('Reporte.pdf');
  }


  cerrarModal() {
    this.mr.close();
  }

}
