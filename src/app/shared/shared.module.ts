// src/app/shared/shared.module.ts
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

// Material
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatButtonModule  }   from '@angular/material/button';
import { MatInputModule   }   from '@angular/material/input';
import { MatCardModule    }   from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';  // ← Añadido

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,   // ← Aquí
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,   // ← Y aquí
  ]
})
export class SharedModule {}
