export function transferToDate(date) {
  // 將時間格式改為 YYYY-MM-DDTHH:mm
  // 2022-04-16T22:27
  const data = new Date(date);
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const str = `${year}-${month}-${day} ${Number(hours) < 12 ? 'AM' : 'PM'} ${Number(hours) < 10 ? `0${hours}` : hours}:${Number(minutes) < 10 ? `0${minutes}` : minutes}`;
  return str;
}

export function transferSinceThen(date) {
  // 算出距今幾天
  var Today = new Date(Date.now());
  var Data = new Date(date);
  var days = parseInt(Math.abs(Today - Data) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return days;
}
