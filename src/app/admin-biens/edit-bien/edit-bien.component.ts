import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiensService } from '../../services/bien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-bien',
  templateUrl: './edit-bien.component.html',
  styleUrls: ['./edit-bien.component.css']
})
export class EditBienComponent implements OnInit {
  bienForm!: FormGroup;
  constructor(private fb: FormBuilder, private bienService: BiensService, private router: Router) {}

  ngOnInit(): void {
    this.bienForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      type: ['', Validators.required]
    });

    this.loadBienData();
  }

  loadBienData(): void {
    const bienId = 3;
    this.bienService.getBien(bienId).subscribe((data) => {
      this.bienForm.patchValue({
        titre: data.titre,
        description: data.description,
        prix: data.prix,
        type: data.type
      });
    });
  }

  onSubmit(): void {
    if (this.bienForm.valid) {
      const updatedBien = this.bienForm.value;

      this.bienService.updateBien(this.bien.id, formData).subscribe(
        response => {
          console.log("Mise à jour réussie", response);
          this.router.navigate(['/biens']);
        },
        error => {
          console.error("Erreur lors de la mise à jour", error);
          alert('Erreur lors de la mise à jour. Vérifiez les champs.');
        }
      );
    } else {
      console.error("Erreur lors de la mise à jour. Vérifiez les champs.");
    }
  }
}
