import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  id: string | null = null;
  user = new User();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getUser();
    })
  }

  getUser() {
    const userDoc = doc(this.firestore, `user/${this.id}`);
    docData(userDoc, {idField: 'id'}).subscribe((userData:any)=> {
      console.log('User loaded:', userData);
      this.user = new User(userData);
    })
  }
}
