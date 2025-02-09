export default function AbbrNumber({ props }) {
  let number = props?.number;
  let decPlaces = props?.decPlaces;
  if (number || decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    var abbrev = ["K", "M", "B", "T"];
    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
  }

  return number;
}
