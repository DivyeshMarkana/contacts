import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  editMode: boolean = false
  selectedValue: string = 'Home'
  photoUrl: string = this.contactData.photoUrl

  contactTypes: any[] = [
    { value: 'Mobile-0', viewValue: 'Mobile' },
    { value: 'Work-1', viewValue: 'Work' },
    { value: 'Home-2', viewValue: 'Home' },
  ];

  constructor(public dialogRef: MatDialogRef<ContactDetailsComponent>, @Inject(MAT_DIALOG_DATA) public contactData: Contact) { }

  ngOnInit(): void {

    // alert(this.contactData.prefix)
    // alert(this.contactData.contactType)
  }
  updatedContactData: any

  contact_form = new FormGroup({
    prefix: new FormControl(this.contactData.prefix),
    firstName: new FormControl(this.contactData.firstName),
    middleName: new FormControl(this.contactData.middleName),
    lastName: new FormControl(this.contactData.lastName),
    suffix: new FormControl(this.contactData.suffix),
    contactNumber: new FormControl(this.contactData.contactNumber),
    contactType: new FormControl(this.contactData.contactType)
  })

  onSubmit() {
    // alert(this.contact_form.value.firstName)
    this.dialogRef.close(this.contact_form.value)

    // this.updatedContactData = {
    //   prfix: this.contact_form.value.prefix,
    //   firstName: this.contact_form.value.firstName,
    //   middleName: this.contact_form.value.middleName,
    //   lastName: this.contact_form.value.lastName,
    //   suffix: this.contact_form.value.suffix,
    //   contactNumber: this.contact_form.value.contactNumber,
    //   contactType: this.contact_form.value.contactType,
    //   // photoUrl: this.photoUrl
    // }

    // this.dialogRef.close(this.updatedContactData)

    // const databaseInstance = collection(this.firestore, 'contacts')

    // addDoc(databaseInstance, contactData).then(() => {
    //   // alert('data added')
    // }).catch((err) => {
    //   alert(err.message)
    // })
  }

  upload(event: any) {
    if (event.target.files) {
      let reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photoUrl = event.target.result
      }
    }
  }

  cancle() {
    this.dialogRef.close(this.contactData)
  }

}
