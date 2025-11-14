import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordApiService } from './services/password-api.service';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Генератор паролів';

  passwordLength: number = 16;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;

  generatedPassword: string = '';
  isLoading: boolean = false;
  copySuccess: boolean = false;

  constructor(
    private passwordApi: PasswordApiService,
    private clipboard: Clipboard
  ) {}

  onGeneratePassword(): void {
    this.copySuccess = false;

    if (this.includeNumbers === false && this.includeSymbols === false) {
      this.generatedPassword = 'Оберіть щонайменше один тип символів';
      this.isLoading = false;

      return;
    }

    this.isLoading = true;

    this.passwordApi
      .generatePassword(
        this.passwordLength,
        this.includeNumbers,
        this.includeSymbols
      )
      .subscribe({
        next: (response) => {
          let filteredPassword = response.random_password;

          if (!this.includeNumbers) {
            filteredPassword = filteredPassword.replace(/[0-9]/g, '');
          }

          if (!this.includeSymbols) {
            filteredPassword = filteredPassword.replace(/[^a-zA-Z0-9]/g, '');
          }

          this.generatedPassword = filteredPassword;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.generatedPassword = 'Помилка генерації';
          this.isLoading = false;
        },
      });
  }

  onCopyPassword(): void {
    if (
      this.generatedPassword &&
      this.generatedPassword !== 'Помилка генерації' &&
      this.generatedPassword !== 'Оберіть щонайменше один тип символів'
    ) {
      this.clipboard.copy(this.generatedPassword);
      this.copySuccess = true;

      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    }
  }
}
