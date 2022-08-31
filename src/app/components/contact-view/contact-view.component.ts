import { Component, Inject, OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { updateDoc } from '@firebase/firestore';
import { Contact } from 'src/app/contact';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public contactData: any, private firestore: Firestore, private dialogRef: MatDialogRef<ContactViewComponent>, private dialog: MatDialog) { }

  ngOnInit(): void {

    // alert(this.contactData.photoUrl)
  }

  photoUrl: string = this.contactData.photoUrl

  openContactUpdateDialog(contact: any) {

    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '350px',
      disableClose: true,
      data: {
        prefix: contact.prefix,
        firstName: contact.firstName,
        middleName: contact.middleName,
        lastName: contact.lastName,
        suffix: contact.suffix,
        contactNumber: contact.contactNumber,
        contactType: contact.contactType,
        photoUrl: contact.photoUrl
      }
    })


    const contactToUpdate = doc(this.firestore, 'contacts', contact.id)

    let updatedData: any

    dialogRef.afterClosed().subscribe((result) => {
      // this.contactData = result
      updatedData = result
      this.contactData = updatedData

      // alert(contact.contactType)
      // alert(updatedData.contactType)
      // alert(this.contactData.contactType)
    })

    updateDoc(contactToUpdate, {
      prefix: this.contactData.prefix,
      firstName: this.contactData.firstName,
      middleName: this.contactData.middleName,
      lastName: this.contactData.lastName,
      suffix: this.contactData.suffix,
      contactNumber: this.contactData.contactNumber,
      contactType: this.contactData.contactType,
      // photoUrl: this.contactData.photoUrl
    }).then((response) => {
      // alert('data updated from view mode')
    }).catch((err) => {
      alert(err.message)
    })

  }

  deleteContact(contact: any) {
    const contactToDelete = doc(this.firestore, 'contacts', contact.id)

    deleteDoc(contactToDelete).then((response) => {
      // alert('contact deleted')
      this.dialogRef.close()

    }).catch((err) => {
      alert(err.message)
    })
  }

  closeDialog() {
    this.dialogRef.close(this.contactData)
  }

}
