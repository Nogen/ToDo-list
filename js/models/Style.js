class Style {
  constructor(object) {
    this.styleBinding = new Map();
    for (let k in object) {
      this.styleBinding.set(k, object[k]);
    }
  }

  getStyle(elemId) {
    return this.styleBinding.get(elemId).split(/\s+/);
  }

  putStyle(elemId, cssClass) {
    this.styleBinding.set(elemId, cssClass);
  }
}
