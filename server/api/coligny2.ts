import * as fs from "fs";
import { readFile, set_fs, utils } from "xlsx";
set_fs(fs);
import _ from "lodash"



export default defineEventHandler(event => {

  // fixed data
  const headerRowsCount = 5
  const colsNamesRow = 4
  const daysRow = 3
  const plagesHorairesCount = 14
  const listeCategories = ['poterie','poterieSociete','societe','lyon','reduction','repas','retard']

    // const pathParams = event.context
    const query = getQuery(event)
    const filePath = query.path?.toString()
    // console.log('filePath : ',filePath)
    //const filePath = "./assets/coligny.xlsx"
    const workbook = readFile(filePath);
    const Author = workbook.Props?.Author
    const SheetName1 =  workbook.SheetNames[0];
    const Sheets = workbook.Sheets[SheetName1];
    const opts = {}
    const wbJson = utils.sheet_to_json(Sheets, opts);
    const rowsJson = _.drop(wbJson, headerRowsCount);
    const rowsCount = rowsJson.length
    const wbCols = _.slice(wbJson,colsNamesRow,colsNamesRow + 1)
    const colsCount = _.size(wbCols[0])
    // console.log('colsCount : ', colsCount)
    const wbDays = _.slice(wbJson,daysRow,daysRow + 1)
    // const wd = _.filter(wbDays, function(o) { return !o = " "; });
    const arrayCols =_.keys(wbDays[0]);
    const arrayDaysBase =_.values(wbDays[0]);

    const arrayDays = _.filter(wbDays[0], (value, key) => value.startsWith("mer"));
    const listeDays = _.keys(arrayDays)
    const daysCount = arrayDays.length
   // console.log('arrayDays : ', arrayDays)
   // console.log('daysCount : ', daysCount)
    const mainData = {}
    let indexDay = 0
    const daysInfos = {}
    // console.log('HTML_table : ', HTML_table)

    const getDaysInfos = _.each( wbDays[0], ( val, key ) => {
      if(val !== ' ' && val !== 'Age'  && val !== 'Nom, prénom'  ){
        // console.log( 'log> ', key, val ); 
        daysInfos[key] = val
        indexDay ++
        mainData[indexDay] = {}
        mainData[indexDay]['rows']= {}
        mainData[indexDay]['jour'] = val
        mainData[indexDay]['col'] = key
        let start = _.toNumber(_.replace(key, "__EMPTY_", ""));
        mainData[indexDay]['colStart'] = start;
      
        if(indexDay > 1){
          let startPrev = mainData[indexDay - 1]['colStart']
          mainData[indexDay - 1]['colsCount'] = start - startPrev;
          let colsCountPrev = mainData[indexDay - 1]['colsCount']
          mainData[indexDay - 1]['colHorairesStart'] = startPrev + colsCountPrev - plagesHorairesCount ;
        } 
        if (indexDay == 4){
          mainData[indexDay]['colsCount'] = colsCount;
          mainData[indexDay]['colHorairesStart'] = colsCount - plagesHorairesCount ;
        }
      }    
    } );

  const HTML_tables = {}

  for( var j = 1 ; j < daysCount + 1 ; j++ ) {



    var o = new Set();

    rowsJson.forEach((item, index) => {
      
      let indexDay = j
      let indexNom = index + 1


      //var r = new Set();
      const rowArray = []
    
      let startLoop = mainData[indexDay]['colStart'];
      let startHoraires = mainData[indexDay]['colHorairesStart'];
      let endLoop = startLoop + mainData[indexDay]['colsCount'];

      // NOM age
      mainData[indexDay]['rows'][indexNom]= {}
      mainData[indexDay]['rows'][indexNom]['nom'] = item.__EMPTY
      rowArray.push(item.__EMPTY); //r.add(item.__EMPTY);

      mainData[indexDay]['rows'][indexNom]['age'] = item.__EMPTY_1
      rowArray.push(item.__EMPTY_1); //r.add(item.__EMPTY_1);

      mainData[indexDay]['rows'][indexNom]['activites'] = {}
      mainData[indexDay]['rows'][indexNom]['horaires'] = {}

      let catIndex = -1
      let plageIndex = 0
      let categorie = ""
      let colName = ""

      for( var i = startLoop ; i < endLoop ; i++ ) {
        let champs = "__EMPTY_" + i
        if(i < startHoraires) { 
          categorie = "activites";
          catIndex ++ ;
          colName = listeCategories[catIndex]
         }
        else {
          categorie = "horaires"
          plageIndex ++
          colName = "plage_" + plageIndex
        }
      //console.log('cat : ', categorie, ' colName : ', colName)
      let champsValue = item[champs]
      mainData[indexDay]['rows'][indexNom][categorie][colName] = champsValue
      rowArray.push(champsValue); //r.add(champsValue);

      }

    o.add(rowArray)
    
    })
   // const HTML_table = Array.from(o)
    HTML_tables[j] = Array.from(o)
  }

    return {
        Author, SheetName1, Sheets, wbJson, wbCols , wbDays, arrayCols, arrayDays, daysInfos,daysCount,listeDays, rowsJson, colsCount, rowsCount, mainData, HTML_tables
    }
  })

  ;