import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user = new User();
  allUsers: User[] = [];
  dialog = inject(MatDialog);

  ngOnInit() {
    const userCollection = collection(this.firestore, 'user');
    collectionData(userCollection).subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    })
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

}
