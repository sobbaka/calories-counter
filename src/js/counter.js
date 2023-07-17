

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
  constructor(form) {
    this.form = form;
    this.elements = this.form.elements;
    this.parameters = this.elements.parameters;
    this.parameters__elem = this.elements.parameters.elements;
    this.age = this.elements.age;
    this.height = this.elements.height;
    this.weight = this.elements.weight;
    this.gender = this.elements.gender;
    this.activity = this.elements.activity;

    this.parametersItems = Array.from(this.parameters__elem)

    this.submit = this.elements.submit;
    this.reset = this.elements.reset;
  }

  _submit() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._countCaloriesNORM()
    })
  }

  _formInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersItems.some(el => el.value)
  }

  _formReset() {
    this.submit.disabled = true;
    this.reset.disabled = true;
  }

  _init() { }

  _countCaloriesMIN() { }

  _countCaloriesNORM() {
    const weight = 10 * this.weight.value;
    const height = 6.25 * this.height.value;
    const age = 5 * this.age.value;
    const genderResult = weight + height - age + genderFactor[this.elements.gender.value]
    const activityResult = genderResult * activityFactor[this.elements.activity.value]
    console.log(Math.round(activityResult))

    return activityResult
  }

  _countCaloriesMAX() { }
}

const form = document.querySelector('.form')
const counter = new Counter(form)

form.addEventListener('input', () => {
  counter._formInput()
})

form.addEventListener('reset', () => {
  counter._formReset()
})

counter._submit()
