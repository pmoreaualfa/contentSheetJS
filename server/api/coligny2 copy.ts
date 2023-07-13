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
    console.log('colsCount : ', colsCount)
    const wbDays = _.slice(wbJson,daysRow,daysRow + 1)
    // const wd = _.filter(wbDays, function(o) { return !o = " "; });
    const arrayCols =_.keys(wbDays[0]);
    const arrayDaysBase =_.values(wbDays[0]);

    const arrayDays = _.filter(wbDays[0], (value, key) => value.startsWith("mer"));
    const daysCount = arrayDays.length
   console.log('arrayDays : ', arrayDays)
   console.log('daysCount : ', daysCount)
    const mainData = {}
    let indexDay = 0
    const daysInfos = {}
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
    console.log('mainData : ', mainData)

    rowsJson.forEach((item, index) => {
      
      //console.log(index + 1, ' => ', item.__EMPTY)
      let indexNom = index + 1
   ////////// JOUR 1
      let startLoop = mainData['1']['colStart'];
      let startHoraires = mainData['1']['colHorairesStart'];
      let endLoop = startLoop + mainData['1']['colsCount'];
      // NOM age
      mainData['1']['rows'][indexNom]= {}
      mainData['1']['rows'][indexNom]['nom'] = item.__EMPTY
      mainData['1']['rows'][indexNom]['age'] = item.__EMPTY_1
      mainData['1']['rows'][indexNom]['activites'] = {}
      mainData['1']['rows'][indexNom]['horaires'] = {}

      for( var i = startLoop ; i < endLoop ; i++ )

      // ACTIVITES
      mainData['1']['rows'][indexNom]['activites']['poterie'] = item.__EMPTY_2
      mainData['1']['rows'][indexNom]['activites']['poterieSociete'] = item.__EMPTY_3
      mainData['1']['rows'][indexNom]['activites']['societe'] = item.__EMPTY_4
      mainData['1']['rows'][indexNom]['activites']['reduction'] = item.__EMPTY_5
      mainData['1']['rows'][indexNom]['activites']['repas'] = item.__EMPTY_6
      mainData['1']['rows'][indexNom]['activites']['retard'] = item.__EMPTY_7
      // HORAIRES
      mainData['1']['rows'][indexNom]['horaires']['plage_1'] = item.__EMPTY_8
      mainData['1']['rows'][indexNom]['horaires']['plage_2'] = item.__EMPTY_9
      mainData['1']['rows'][indexNom]['horaires']['plage__3'] = item.__EMPTY_10
      mainData['1']['rows'][indexNom]['horaires']['plage__4'] = item.__EMPTY_11
      mainData['1']['rows'][indexNom]['horaires']['plage_5'] = item.__EMPTY_12
      mainData['1']['rows'][indexNom]['horaires']['plage_6'] = item.__EMPTY_13
      mainData['1']['rows'][indexNom]['horaires']['plage_7'] = item.__EMPTY_14
      mainData['1']['rows'][indexNom]['horaires']['plage_8'] = item.__EMPTY_15
      mainData['1']['rows'][indexNom]['horaires']['plage_9'] = item.__EMPTY_16
      mainData['1']['rows'][indexNom]['horaires']['plage_10'] = item.__EMPTY_17
      mainData['1']['rows'][indexNom]['horaires']['plage_11'] = item.__EMPTY_18
      mainData['1']['rows'][indexNom]['horaires']['plage_12'] = item.__EMPTY_19
      mainData['1']['rows'][indexNom]['horaires']['plage_13'] = item.__EMPTY_20
      mainData['1']['rows'][indexNom]['horaires']['plage_14'] = item.__EMPTY_21
    

////////// JOUR 2    
      // NOM age
      mainData['2']['rows'][indexNom]= {}
      mainData['2']['rows'][indexNom]['nom'] = item.__EMPTY
      mainData['2']['rows'][indexNom]['age'] = item.__EMPTY_1
      // ACTIVITES
      mainData['2']['rows'][indexNom]['activites'] = {}
      mainData['2']['rows'][indexNom]['activites']['poterie'] = item.__EMPTY_22
      mainData['2']['rows'][indexNom]['activites']['poterieSociete'] = item.__EMPTY_23
      mainData['2']['rows'][indexNom]['activites']['societe'] = item.__EMPTY_24
      mainData['2']['rows'][indexNom]['activites']['lyon'] = item.__EMPTY_25
      mainData['2']['rows'][indexNom]['activites']['reduction'] = item.__EMPTY_26
      mainData['2']['rows'][indexNom]['activites']['repas'] = item.__EMPTY_27
      mainData['2']['rows'][indexNom]['activites']['retard'] = item.__EMPTY_28
      // HORAIRES
      mainData['2']['rows'][indexNom]['horaires'] = {}
      mainData['2']['rows'][indexNom]['horaires']['plage_1'] = item.__EMPTY_29
      mainData['2']['rows'][indexNom]['horaires']['plage_2'] = item.__EMPTY_30
      mainData['2']['rows'][indexNom]['horaires']['plage_3'] = item.__EMPTY_31
      mainData['2']['rows'][indexNom]['horaires']['plage_4'] = item.__EMPTY_32
      mainData['2']['rows'][indexNom]['horaires']['plage_5'] = item.__EMPTY_33
      mainData['2']['rows'][indexNom]['horaires']['plage_6'] = item.__EMPTY_34
      mainData['2']['rows'][indexNom]['horaires']['plage_7'] = item.__EMPTY_35
      mainData['2']['rows'][indexNom]['horaires']['plage_8'] = item.__EMPTY_36
      mainData['2']['rows'][indexNom]['horaires']['plage_9'] = item.__EMPTY_37
      mainData['2']['rows'][indexNom]['horaires']['plage_10'] = item.__EMPTY_38
      mainData['2']['rows'][indexNom]['horaires']['plage_11'] = item.__EMPTY_39
      mainData['2']['rows'][indexNom]['horaires']['plage_12'] = item.__EMPTY_40
      mainData['2']['rows'][indexNom]['horaires']['plage_13'] = item.__EMPTY_41
      mainData['2']['rows'][indexNom]['horaires']['plage_14'] = item.__EMPTY_42

   ////////// JOUR 3
      // NOM age
      mainData['3']['rows'][indexNom]= {}
      mainData['3']['rows'][indexNom]['nom'] = item.__EMPTY
      mainData['3']['rows'][indexNom]['age'] = item.__EMPTY_1
      // ACTIVITES
      mainData['3']['rows'][indexNom]['activites'] = {}
      mainData['3']['rows'][indexNom]['activites']['poterie'] = item.__EMPTY_43
      mainData['3']['rows'][indexNom]['activites']['poterieSociete'] = item.__EMPTY_44
      mainData['3']['rows'][indexNom]['activites']['societe'] = item.__EMPTY_45
      mainData['3']['rows'][indexNom]['activites']['reduction'] = item.__EMPTY_46
      mainData['3']['rows'][indexNom]['activites']['repas'] = item.__EMPTY_47
      mainData['3']['rows'][indexNom]['activites']['retard'] = item.__EMPTY_48
      // HORAIRES
      mainData['3']['rows'][indexNom]['horaires'] = {}
      mainData['3']['rows'][indexNom]['horaires']['plage_1'] = item.__EMPTY_49
      mainData['3']['rows'][indexNom]['horaires']['plage_2'] = item.__EMPTY_50
      mainData['3']['rows'][indexNom]['horaires']['plage_3'] = item.__EMPTY_51
      mainData['3']['rows'][indexNom]['horaires']['plage_4'] = item.__EMPTY_52
      mainData['3']['rows'][indexNom]['horaires']['plage_5'] = item.__EMPTY_53
      mainData['3']['rows'][indexNom]['horaires']['plage_6'] = item.__EMPTY_54
      mainData['3']['rows'][indexNom]['horaires']['plage_7'] = item.__EMPTY_55
      mainData['3']['rows'][indexNom]['horaires']['plage_8'] = item.__EMPTY_56
      mainData['3']['rows'][indexNom]['horaires']['plage_9'] = item.__EMPTY_57
      mainData['3']['rows'][indexNom]['horaires']['plage_10'] = item.__EMPTY_58
      mainData['3']['rows'][indexNom]['horaires']['plage_11'] = item.__EMPTY_59
      mainData['3']['rows'][indexNom]['horaires']['plage_12'] = item.__EMPTY_60
      mainData['3']['rows'][indexNom]['horaires']['plage_13'] = item.__EMPTY_61
      mainData['3']['rows'][indexNom]['horaires']['plage_14'] = item.__EMPTY_62


   ////////// JOUR 4
      // NOM age
      mainData['4']['rows'][indexNom]= {}
      mainData['4']['rows'][indexNom]['nom'] = item.__EMPTY
      mainData['4']['rows'][indexNom]['age'] = item.__EMPTY_1
      // ACTIVITES
      mainData['4']['rows'][indexNom]['activites'] = {}
      mainData['4']['rows'][indexNom]['activites']['poterie'] = item.__EMPTY_63
      mainData['4']['rows'][indexNom]['activites']['poterieSociete'] = item.__EMPTY_64
      mainData['4']['rows'][indexNom]['activites']['societe'] = item.__EMPTY_65
      mainData['4']['rows'][indexNom]['activites']['reduction'] = item.__EMPTY_66
      mainData['4']['rows'][indexNom]['activites']['repas'] = item.__EMPTY_67
      mainData['4']['rows'][indexNom]['activites']['retard'] = item.__EMPTY_68
      // HORAIRES
      mainData['4']['rows'][indexNom]['horaires'] = {}
      mainData['4']['rows'][indexNom]['horaires']['plage_1'] = item.__EMPTY_69
      mainData['4']['rows'][indexNom]['horaires']['plage_2'] = item.__EMPTY_70
      mainData['4']['rows'][indexNom]['horaires']['plage_3'] = item.__EMPTY_71
      mainData['4']['rows'][indexNom]['horaires']['plage_4'] = item.__EMPTY_72
      mainData['4']['rows'][indexNom]['horaires']['plage_5'] = item.__EMPTY_73
      mainData['4']['rows'][indexNom]['horaires']['plage_6'] = item.__EMPTY_74
      mainData['4']['rows'][indexNom]['horaires']['plage_7'] = item.__EMPTY_75
      mainData['4']['rows'][indexNom]['horaires']['plage_8'] = item.__EMPTY_76
      mainData['4']['rows'][indexNom]['horaires']['plage_9'] = item.__EMPTY_77
      mainData['4']['rows'][indexNom]['horaires']['plage_10'] = item.__EMPTY_78
      mainData['4']['rows'][indexNom]['horaires']['plage_11'] = item.__EMPTY_79
      mainData['4']['rows'][indexNom]['horaires']['plage_12'] = item.__EMPTY_80
      mainData['4']['rows'][indexNom]['horaires']['plage_13'] = item.__EMPTY_81


    })
 /*    const getNoms = () => {
      for()
      _.each( rowsJson[0], ( val, key ) => {
    
  
      });
    }  */
      // console.log('mainData : ', mainData)
     // console.log('rowsCount : ', rowsCount)
    return {
        Author, SheetName1, Sheets, wbJson, wbCols , wbDays, arrayCols, arrayDays, daysInfos, rowsJson, colsCount, rowsCount, mainData

    }
  });