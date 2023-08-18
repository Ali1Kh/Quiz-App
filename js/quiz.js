export class quiz {
  constructor(category, diff, numQ) {
    this.category = category;
    this.diff = diff;
    this.numQ = numQ;
  }
  async getQuestions() {
    let apiResponse = await fetch(
      `https://opentdb.com/api.php?amount=${this.numQ}&category=${this.category}&difficulty=${this.diff}`
    );
    let res = await apiResponse.json();
    return res.results;
  }
}
