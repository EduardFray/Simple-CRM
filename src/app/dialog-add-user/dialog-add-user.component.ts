import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { MatNativeDateModule } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { Firestore, addDoc, collection, collectionData, } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AsyncPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate: Date = new Date();

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('This is the actual user', this.user);

    const userCollection = collection(this.firestore, 'user')

    try {
      await addDoc(userCollection, this.user.toJSON());
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

}
