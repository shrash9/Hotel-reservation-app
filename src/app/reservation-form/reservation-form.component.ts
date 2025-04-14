import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private reservationservice: ReservationService){
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      CheckInDate: ['',Validators.required],
      CheckOutDate: ['',Validators.required],
      GuestName: ['', Validators.required],
      GuestEmail : ['', [Validators.required, Validators.email]],
      RoomNumber : ['',Validators.required]
    })
  }

  Onsubmit(){
    if(this.reservationForm.valid){
      let reservation : Reservation = this.reservationForm.value;
      this.reservationservice.addReservation(reservation)
    }
  }
}

