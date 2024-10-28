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
    },
      (error) => {
        console.error('Erreur lors du chargement des biens', error);
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Mettez à jour le fichier sélectionné
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bien.imagePath = e.target.result; // stocke le chemin de l'image pour l'aperçu
      };
      reader.readAsDataURL(file);
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
      formData.append('imagePath', this.selectedFile, this.selectedFile.name);
    }

    const request = this.bien.id
      ? this.biensService.updateBien(this.bien.id, formData) // Assurez-vous que l'ID est inclus
      : this.biensService.createBien(formData);

    request.subscribe(
      () => {
        this.loadBiens();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la soumission du bien', error);
      }
    );
  }

  editBien(bien: Bien): void {
    this.bien = { ...bien }; // Clone l'objet bien pour le modifier
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
    // Si vous voulez afficher l'image existante, vous pouvez la charger ici
  }

  deleteBien(id?: number): void {
    // Vérifiez si l'identifiant est défini
    if (id !== undefined) {
      this.biensService.deleteBien(id).subscribe(
        () => {
          // Rechargez la liste des biens après la suppression
          this.loadBiens();
        },
        (error) => {
          // Gérer l'erreur et afficher un message informatif
          console.error('Erreur lors de la suppression du bien', error);
          alert('Une erreur est survenue lors de la suppression du bien. Veuillez réessayer.');
        }
      );
    } else {
      console.error("ID est undefined. Impossible de supprimer le bien.");
      alert("Erreur : l'identifiant du bien est manquant.");
    }
  }
  resetForm(): void {
    this.bien = { titre: '', description: '', prix: 0, disponible: true, type: 'appartement' };
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
  }
}
