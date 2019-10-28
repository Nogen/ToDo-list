class DateConverter {
  static toDate(dateString) {
    let res = dateString.split("/D/");
    return new Date(res[0], --res[1], res[2]);
  }

  static toString(date) {
    let month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }
}
