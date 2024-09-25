import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup = this.fb.group({});
  fileError: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB limit
        this.fileError = 'File size should not exceed 5 MB';
      } else if (!file.type.startsWith('image/')) {
        this.fileError = 'Only image files are allowed';
      } else {
        this.fileError = null;
        // Handle file upload here (e.g., send to server)
        console.log('File selected:', file);
      }
    }
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.userProfileForm.get('name')?.value);
      // Handle form submission here (e.g., send to server)
      console.log('Form submitted:', this.userProfileForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
