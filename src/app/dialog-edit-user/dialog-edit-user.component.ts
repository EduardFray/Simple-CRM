import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  firestore: Firestore = inject(Firestore);
  user: User = new User(this.data.user);
  birthDate: Date = new Date();
  loading = false;

  ngOnInit(): void {
    if (this.user?.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  saveUser() {
    const userDoc = doc(this.firestore, `user/${this.user.id}`);

    const updatedBirthDate = this.birthDate.getTime();

    this.loading = true;
    updateDoc(userDoc, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: updatedBirthDate
    })
      .then(() => {
        console.log('User erfolgreich aktualisiert');
        this.loading = false;
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren:', error);
        this.loading = false;
      });
  }

}
