import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-d0482","appId":"1:763853380412:web:d0b96db2ac8ba1551edc39","storageBucket":"simple-crm-d0482.firebasestorage.app","apiKey":"AIzaSyCfcmVb8jXVg3zbVgVfmStWZiC9H042eoI","authDomain":"simple-crm-d0482.firebaseapp.com","messagingSenderId":"763853380412"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
