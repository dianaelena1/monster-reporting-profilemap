import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZephyrService } from '../../../services/zephyr.service';

@Component({
    selector: 'app-new-test-cycle',
    templateUrl: './new-test-cycle.component.html',
})
export class NewTestCycleComponent {
    testCycleForm: FormGroup;

    constructor(private fb: FormBuilder, private zephyrService: ZephyrService) {
        this.testCycleForm = this.fb.group({
            name: ['', Validators.required],
            folder: ['', Validators.required],
            labels: ['', Validators.required],
        });
    }

    onSubmit(): void {
        // const { name, folder, labels } = this.testCycleForm.value;
        // const labelsArray = labels.split(',').map((label: any) => label.trim());
        // this.zephyrService.Create_ZpTestCycle_For_ZpLabels('NEW', 'Smoke Tests', ['Zephyr']);
    }
}
