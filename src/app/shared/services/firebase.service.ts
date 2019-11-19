import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  createUser(user: any) {
    return this.db.collection("users").add(user);
  }

  getUsers() {
    return this.db.collection("users").snapshotChanges();
  }

  getUserDetailByDocId(docId) {
    return this.db
      .collection("users")
      .doc(docId)
      .snapshotChanges();
  }

  updateUser(userKey, user) {
    return this.db
      .collection("users")
      .doc(userKey)
      .set(user);
  }

  deleteUser(docId) {
    return this.db
      .collection("users")
      .doc(docId)
      .delete();
  }
}
