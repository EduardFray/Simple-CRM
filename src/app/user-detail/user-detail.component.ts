import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData, deleteDoc } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports:
    [
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      MatMenuModule
    ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  id: string | null = null;
  user = new User();
  dialog = inject(MatDialog);
  router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getUser();
    })
  }

  getUser() {
    const userDoc = doc(this.firestore, `user/${this.id}`);
    docData(userDoc, { idField: 'id' }).subscribe((userData: any) => {
      console.log('User loaded:', userData);
      this.user = new User(userData);
    })
  }


  editAddress() {
    this.dialog.open(DialogEditAddressComponent, {
      data: { user: this.user.toJSON() }
    });
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent, {
      data: { user: this.user.toJSON() }
    });
  }

  deleteUser() {
  if (!this.user?.id) {
    console.error('Fehler: user.id ist nicht definiert');
    return;
  }

  const userDoc = doc(this.firestore, `user/${this.user.id}`);

  deleteDoc(userDoc)
    .then(() => {
      console.log('User erfolgreich gelöscht');
      this.router.navigate(['/user']); // zurück zur Übersicht oder Home leiten
    })
    .catch((error) => {
      console.error('Fehler beim Löschen:', error);
    });
}
}
