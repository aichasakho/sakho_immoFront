import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiensService } from '../../services/bien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bien } from '../../models/bien.model';

@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {
  bienForm!: FormGroup;
  selectedFile?: File;
  bienId!: number;

  constructor(
    private fb: FormBuilder,
    private bienService: BiensService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bienForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      type: ['', Validators.required]
    });

    this.bienId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadBienData();
  }

  loadBienData(): void {
    this.bienService.getBien(this.bienId).subscribe(
      (data) => {
        this.bienForm.patchValue({
          titre: data.titre,
          description: data.description,
          prix: data.prix,
          type: data.type
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du bien', error);
        alert('Bien introuvable');
      }
    );
  }

  onSubmit(): void {
    if (this.bienForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.bienForm.get('titre')?.value);
      formData.append('description', this.bienForm.get('description')?.value);
      formData.append('prix', this.bienForm.get('prix')?.value);
      formData.append('type', this.bienForm.get('type')?.value);

      if (this.selectedFile) {
        formData.append('imagePath', this.selectedFile, this.selectedFile.name);
      }

      console.log('FormData:', formData);

      this.bienService.updateBien(this.bienId, formData).subscribe(
        (response) => {
          console.log("Mise à jour réussie", response);
          this.router.navigate(['/biens']);
        },
        (error) => {
          console.error("Erreur lors de la mise à jour", error);
          alert('Erreur lors de la mise à jour. Vérifiez les champs.');
        }
      );
    } else {
      console.error("Erreur lors de la soumission. Vérifiez les champs.");
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      console.log("File selected:", file);
    }
  }
}
