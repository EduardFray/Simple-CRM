import { Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  firestore: Firestore = inject(Firestore);
  allUsers$ = collectionData(collection(this.firestore, 'user'), { idField: 'id' });
  currentDate = new Date().toLocaleDateString('de-DE');
  route = inject(Router);

  openUser(){
    this.route.navigate(['/user']);
  }
}
