export default class RenderResult {
  constructor(element) {
    this.block = element.querySelector('.result');
    this.caloriesNorm = element.querySelector('#calories__norm');
    this.caloriesMin = element.querySelector('#calories__minimal');
    this.caloriesMax = element.querySelector('#calories__maximum');
  }

  show(data) {
    this.caloriesNorm.textContent = data.NORM;
    this.caloriesMin.textContent = data.MIN;
    this.caloriesMax.textContent = data.MAX;
    this.block.classList.remove('hidden');
  }

  hide() {
    this.caloriesNorm.textContent = 0;
    this.caloriesMin.textContent = 0;
    this.caloriesMax.textContent = 0;
    this.block.classList.add('hidden');
  }
}
