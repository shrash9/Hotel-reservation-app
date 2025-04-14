import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private reservationservice: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      CheckInDate: ['',Validators.required],
      CheckOutDate: ['',Validators.required],
      GuestName: ['', Validators.required],
      GuestEmail : ['', [Validators.required, Validators.email]],
      RoomNumber : ['',Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id') 

    if(id){
      let reservation = this.reservationservice.getReservation(id) 
      if(reservation) this.reservationForm.patchValue(reservation)
    }
  }

  Onsubmit(){
    if(this.reservationForm.valid){
      let reservation : Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id') 

    if(id){
      this.reservationservice.updateReservation(id,reservation);
    }
      else{
        this.reservationservice.addReservation(reservation)
      }
    }
  }
}

