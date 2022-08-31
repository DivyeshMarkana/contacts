import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  photoUrl: string = ''

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }
  selectedValue: string;
  // panelColor = new FormControl('Mobile');

  contactTypes: any[] = [
    { value: 'Mobile-0', viewValue: 'Mobile' },
    { value: 'Work-1', viewValue: 'Work' },
    { value: 'Home-2', viewValue: 'Home' },
  ];

  // contact_form = new FormGroup({
  //   name: new FormGroup({
  //     prefix: new FormControl(''),
  //     firstName: new FormControl(''),
  //     middleName: new FormControl(''),
  //     lastName: new FormControl(''),
  //     suffix: new FormControl(''),
  //   }),
  //   contact: new FormArray([
  //     // // contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  //     // contactNumber: new FormControl('', [Validators.required]),
  //     // contactType: new FormControl('Mobile')
  //     this.addContactFormGroup()
  //   ])
  // })


  upload(event: any) {
    if (event.target.files) {
      let reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photoUrl = event.target.result
        // alert(this.photoUrl)
        // console.log(typeof this.photoUrl)
      }
    }
  }
  contact_form = new FormGroup({
    name: new FormGroup({
      prefix: new FormControl(''),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      suffix: new FormControl('')
    }),
    contact: new FormGroup({
      // contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
      contactNumber: new FormControl('', [Validators.required]),
      contactType: new FormControl('Mobile')
    })
  })

  // addContactFormGroup(): FormGroup {
  //   return new FormGroup({
  //     contactNumber: new FormControl('', [Validators.required]),
  //     contactType: new FormControl('Mobile'),
  //   })
  // }

  // getContactFormArray(): FormArray {
  //   return this.contact_form.get('contact') as FormArray
  // }

  // addContactFields() {
  //   (this.contact_form.get('contact') as FormArray).push(this.addContactFormGroup())
  // }

  onSubmit() {
    // alert(this.contact_form.value.name.firstName + ' ' + this.contact_form.value.name.lastName)

    // alert(this.photoUrl)

    let contactData = {
      prefix: this.contact_form.value.name.prefix,
      firstName: this.contact_form.value.name.firstName,
      middleName: this.contact_form.value.name.middleName,
      lastName: this.contact_form.value.name.lastName,
      suffix: this.contact_form.value.name.suffix,
      contactNumber: this.contact_form.value.contact.contactNumber,
      contactType: this.contact_form.value.contact.contactType,
      photoUrl: this.photoUrl
    }

    // alert(contactData.contactNumber)
    const databaseInstance = collection(this.firestore, 'contacts')

    addDoc(databaseInstance, contactData).then(() => {

      if (contactData.firstName === '' && contactData.middleName === '' && contactData.lastName === '' && contactData.prefix === '' && contactData.suffix === '') {
        alert('your contact saved with your number')
      }
      // alert('data added')
    }).catch((err) => {
      alert(err.message)
    })

    // alert(this.getContactFormArray())
  }


}
