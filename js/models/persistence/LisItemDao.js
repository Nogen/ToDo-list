class ListItemDao {
  constructor(source = new Map()) {
    this.source = source;
    this.lastIndex = 0;
    if (this.source.size > 0) {
      this.lastIndex = Array.from(this.source.keys()).sort((a, b) => b - a)[0];
    }
  }

  findAll() {
    return Array.from(this.source.values());
  }

  find(id) {
    return this.source.get(id);
  }

  save(item) {
    item.setId(++this.lastIndex);
    this.source.set(this.lastIndex, item);
    return item;
  }

  update(item) {
    this.source.set(item.getId(), item);
  }

  delete(item) {
    this.source.delete(item.getId());
  }

  deleteById(id) {
    this.source.delete(id);
  }
}
