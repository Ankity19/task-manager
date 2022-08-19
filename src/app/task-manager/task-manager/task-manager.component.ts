import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CardDetail, listDetail } from './task-manager.interface';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  thisIsMyForm: FormGroup;

  name = new FormControl('', Validators.required);
  addListOpen = false;
  addCardOpen = false;
  numberOflists: listDetail[] = [];
  cards: CardDetail[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.thisIsMyForm = new FormGroup({
      formArrayName: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  addList(): void {
    this.addListOpen = true;
  }
  saveList(): void {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;
    controlArray.push(
      this.formBuilder.group({
        cardName: new FormControl('', Validators.required),
      })
    );
    if (this.name.valid) {
      const list = {
        name: this.name?.value as string,
        cards: [],
        isCardsFormOpen: false,
      };
      this.numberOflists.push(list);
      this.name.reset();
      this.addListOpen = false;
    }
  }

  addCard(): void {
    this.addCardOpen = true;
  }
  saveCard(index: number): void {
    const controlArray = this.thisIsMyForm.get('formArrayName') as FormArray;
    if (controlArray.controls[index].valid) {
      this.numberOflists[index].cards.push(controlArray.controls[index].value);
      this.addCardOpen = false;
      controlArray.controls[index].reset();
    }
  }
  getValidity(i: number) {
    return (
      (<FormArray>this.thisIsMyForm.get('formArrayName')).controls[i].invalid &&
      (<FormArray>this.thisIsMyForm.get('formArrayName')).controls[i].touched
    );
  }
}
