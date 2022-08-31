import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/contact';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { collection, Firestore, onSnapshot, deleteDoc, updateDoc, doc } from '@angular/fire/firestore';
import { ContactViewComponent } from '../contact-view/contact-view.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts() {
    const databaseInstance = collection(this.firestore, 'contacts')

    onSnapshot(databaseInstance, snapshot => {
      let contacts: any[] = []
      snapshot.forEach(doc => {
        contacts.push({ ...doc.data(), id: doc.id })
        this.contactList = contacts
      })
    })

  }

  contactList: Contact[] = [
    // {
    //   prefix: undefined,
    //   firstName: 'John',
    //   middleName: undefined,
    //   lastName: 'Doe',
    //   suffix: undefined,
    //   contactNumber: 9933400332
    // },
    // {
    //   prefix: undefined,
    //   firstName: 'Mike',
    //   middleName: undefined,
    //   lastName: 'Garrison',
    //   suffix: undefined,
    //   contactNumber: 45988923753
    // },
    // {
    //   prefix: undefined,
    //   firstName: 'Sally',
    //   middleName: undefined,
    //   lastName: 'Watson',
    //   suffix: undefined,
    //   contactNumber: 9823400223
    // },
  ]

  openAddContactDialog() {
    this.dialog.open(AddContactComponent, {
      width: '400px',
      // height: '600px',
      disableClose: true

    })
  }

  openContactUpdateDialog(contact: any) {
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '400px',
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

    let contactData: any;
    let updatedData: any;

    dialogRef.afterClosed().subscribe(result => {
      updatedData = result
      contactData = updatedData
      // alert(JSON.stringify(contactData))
      // alert(contact.photoUrl)
      // alert(contactData.photoUrl)

      const contactToUpdate = doc(this.firestore, 'contacts', contact.id)

      updateDoc(contactToUpdate, {
        prefix: contactData.prefix,
        firstName: contactData.firstName,
        middleName: contactData.middleName,
        lastName: contactData.lastName,
        suffix: contactData.suffix,
        contactNumber: contactData.contactNumber,
        contactType: contactData.contactType,
        // photoUrl: contactData.photoUrl
      }).then((response) => {
        // alert('data updated')
        if (contactData.firstName === '' && contactData.middleName === '' && contactData.lastName === '' && contactData.firstName === '' && contactData.firstName === '') {
          alert('your contact saved with your number')
        }
        this.getContacts()
      }).catch((err) => {
        alert(err.message)
      })

      // alert(contact.firstName)
      // alert(contactData.firstName)
    })


  }

  openContactView(contact: any) {
    const dialogRef = this.dialog.open(ContactViewComponent, {
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
        id: contact.id,
        photoUrl: contact.photoUrl
      }
    })

    let contactData: any;
    let updatedData: any;

    dialogRef.afterClosed().subscribe(result => {
      updatedData = result
      contactData = updatedData

      // alert(contact.contactType)
      // alert(contactData.contactType)



      const contactToUpdate = doc(this.firestore, 'contacts', contact.id)

      updateDoc(contactToUpdate, {
        prefix: contactData.prefix,
        firstName: contactData.firstName,
        middleName: contactData.middleName,
        lastName: contactData.lastName,
        suffix: contactData.suffix,
        contactNumber: contactData.contactNumber,
        contactType: contactData.contactType,
        // photoUrl: contactData.photoUrl
      }).then((response) => {
        // alert('data updated')
        if (contactData.firstName === '' && contactData.middleName === '' && contactData.lastName === '' && contactData.firstName === '' && contactData.firstName === '') {
          alert('your contact saved with your number')
        }
        this.getContacts()
      }).catch((err) => {
        alert(err.message)
      })
    })


  }

  deleteContact(contact: any) {

    const contactToDelete = doc(this.firestore, 'contacts', contact.id)

    deleteDoc(contactToDelete).then((response) => {
      // alert('contact deleted')
    }).catch((err) => {
      alert(err.message)
    })

  }

}
    // let data = {
      //   prfix: contactData.prefix,
      //   firstName: contactData.firstName,
      //   middleName: contactData.middleName,
      //   lastName: contactData.lastName,
      //   suffix: contactData.suffix,
      //   contactNumber: contactData.contactNumber,
      // }  
