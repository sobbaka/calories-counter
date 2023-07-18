import RenderResult from './renderResult';


const genderFactor = {
  MALE: 5,
  FEMALE: -161
}


const activityFactor = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9
}


class Counter {
  constructor(element) {
    this.form = document.querySelector('.form');
    this.elements = this.form.elements;
    this.parameters = this.elements.parameters;
    this.parameters__elem = this.elements.parameters.elements;
    this.age = this.elements.age;
    this.height = this.elements.height;
    this.weight = this.elements.weight;
    this.gender = this.elements.gender;
    this.activity = this.elements.activity;
    this.submit = this.elements.submit;
    this.reset = this.elements.reset;

    this.parametersItems = Array.from(this.parameters__elem)
    this.renderResult = new RenderResult(element);
  }


  _formSubmit() {
    const caloriesValues = {
      NORM: this._countCaloriesNORM(),
      MIN: this._countCaloriesMIN(),
      MAX: this._countCaloriesMAX()
    }
    this.renderResult.show(caloriesValues)
  }


  _formInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersItems.some(el => el.value)
  }


  _formReset() {
    this.submit.disabled = true;
    this.reset.disabled = true;
    this.renderResult.hide()
  }


  _init() {
    this.form.addEventListener('input', () => { this._formInput() });
    this.form.addEventListener('reset', () => { this._formReset() });
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmit()
    });
  }


  _countCaloriesMIN() {
    return Math.round(this._countCaloriesNORM() * 0.85)
  }


  _countCaloriesNORM() {
    const weight = 10 * this.weight.value;
    const height = 6.25 * this.height.value;
    const age = 5 * this.age.value;
    const genderResult = weight + height - age + genderFactor[this.elements.gender.value]
    const activityResult = genderResult * activityFactor[this.elements.activity.value]
    return Math.round(activityResult)
  }


  _countCaloriesMAX() {
    return Math.round(this._countCaloriesNORM() * 1.15)
  }
}

const form = document.querySelector('.container')
const counter = new Counter(form)
counter._init()
