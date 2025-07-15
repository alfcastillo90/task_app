// src/app/shared/shared.module.ts
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

// Material
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatButtonModule  }   from '@angular/material/button';
import { MatInputModule   }   from '@angular/material/input';
import { MatCardModule    }   from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule }  from '@angular/material/checkbox';  // ← Nuevo
import { MatIconModule }      from '@angular/material/icon';      // ← Nuevo

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
  ]
})
export class SharedModule {}
