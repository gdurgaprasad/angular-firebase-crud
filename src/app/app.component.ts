import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "./shared/services/firebase.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { EditUserDialogComponent } from "./pages/edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ["fName", "lName", "age", "mobile", "action"];
  userForm: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      mobile: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.userForm.markAllAsTouched();
    this.dataSource = new MatTableDataSource([]);
    this.getUsers();
  }

  getUsers(): void {
    this.firebaseService.getUsers().subscribe(data => {
      this.dataSource.data = data;
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

  saveUser() {
    this.firebaseService.createUser(this.construct());
    this.userForm.reset();
  }

  deleteUserByDocId(docId: any) {
    this.firebaseService.deleteUser(docId);
  }

  openEditUserDialog(docId: any) {
    this.dialog.open(EditUserDialogComponent, { data: docId });
  }
}
