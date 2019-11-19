import { Component, OnInit, Inject } from "@angular/core";
import { FirebaseService } from "../../shared/services/firebase.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.scss"]
})
export class EditUserDialogComponent implements OnInit {
  userForm: FormGroup;
  userDetail: any;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserDialogComponent>
  ) {
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null],
      age: [null],
      mobile: [null]
    });
  }

  ngOnInit() {
    this.getUserDetailByDocId();
  }

  getUserDetailByDocId(): void {
    this.firebaseService.getUserDetailByDocId(this.data).subscribe(data => {
      this.userDetail = data;
      this.setForm();
    });
  }

  setForm() {
    this.userForm.setValue({
      firstName: this.userDetail.payload.data().firstName,
      lastName: this.userDetail.payload.data().lastName,
      age: this.userDetail.payload.data().age,
      mobile: this.userDetail.payload.data().mobile
    });
  }

  get fieldControls() {
    return this.userForm.controls;
  }

  construct() {
    return {
      firstName: this.fieldControls.firstName.value,
      lastName: this.fieldControls.lastName.value,
      age: this.fieldControls.age.value,
      mobile: this.fieldControls.mobile.value
    };
  }

  updateUser() {
    this.firebaseService.updateUser(this.data, this.construct());
    this.dialogRef.close("SUCCESS");
  }

  cancel() {
    this.dialogRef.close("CANCEL");
  }
}
