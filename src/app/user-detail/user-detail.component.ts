import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

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
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
  }
}
