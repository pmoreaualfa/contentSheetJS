export const useXlsxColonnes = () => {
    let i = 0
    let colsArray = [];
  for (i = 65; i <= 90; i++) {
    let code = String.fromCharCode(i)
    colsArray.push(code);

  }
  for (i = 65; i <= 68; i++) {
    let code = String.fromCharCode(i)
    let j = 0
    for (j = 65; j <= 90; j++) {
        let code2 = code + String.fromCharCode(j)
        colsArray.push(code2);
    }
}
    return colsArray
  }
  