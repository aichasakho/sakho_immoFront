import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiensService } from '../services/bien.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bien: any;
  reservation = {
    utilisateur_id: "",
    bien_id: ""
  };

  constructor(
    private route: ActivatedRoute,
    private biensService: BiensService,
    private router: Router,
) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBienDetail(id);
    }
  }

  getBienDetail(id: string) {
    this.biensService.getBienById(id).subscribe(data => {
      this.bien = data;
    }, error => {
      console.error('Error fetching bien detail', error);
    });
  }


}

