import { Component, OnInit } from '@angular/core';
import { BiensService } from '../services/bien.service';
import { Bien } from '../models/bien.model';

@Component({
  selector: 'app-admin-biens',
  templateUrl: './admin-biens.component.html',
  styleUrls: ['./admin-biens.component.css']
})
export class AdminBiensComponent implements OnInit {
  biens: Bien[] = [];
  bien: Bien = { titre: '', description: '', prix: 0, disponible: true, type: 'appartement' };
  selectedFile: File | null = null;

  constructor(private biensService: BiensService) {}

  ngOnInit(): void {
    this.loadBiens();
  }

  loadBiens(): void {
    this.biensService.getBiens().subscribe((data: Bien[]) => {
      this.biens = data;
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('titre', this.bien.titre);
    formData.append('description', this.bien.description);
    formData.append('prix', this.bien.prix.toString());
    formData.append('disponible', this.bien.disponible ? '1' : '0');
    formData.append('type', this.bien.type);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.bien.id) {
      this.biensService.updateBien(this.bien.id, formData).subscribe(() => {
        this.loadBiens();
        this.resetForm();
      });
    } else {
      this.biensService.createBien(formData).subscribe(() => {
        this.loadBiens();
        this.resetForm();
      });
    }
  }

  editBien(bien: Bien): void {
    this.bien = { ...bien };
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
  }

  deleteBien(id?: number): void {
    // Vérifiez si l'identifiant est défini
    if (id !== undefined) {
      this.biensService.deleteBien(id).subscribe(() => {
        this.loadBiens();
      });
    } else {
      console.error("ID est undefined. Impossible de supprimer le bien.");
    }
  }

  resetForm(): void {
    this.bien = { titre: '', description: '', prix: 0, disponible: true, type: 'appartement' };
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
  }
}
