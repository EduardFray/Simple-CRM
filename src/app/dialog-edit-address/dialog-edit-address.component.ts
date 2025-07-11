import { Component, Input, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatInputModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  data = inject(MAT_DIALOG_DATA);
  firestore: Firestore = inject(Firestore);
  user: User = new User(this.data.user);
  loading = false;

  saveUser() {
    const userDoc = doc(this.firestore, `user/${this.user.id}`);

    this.loading = true;
    updateDoc(userDoc, {
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city
    })
      .then(() => {
        console.log('User Address erfolgreich aktualisiert');
        this.loading = false;
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren:', error);
        this.loading = false;
      });
  }
}

