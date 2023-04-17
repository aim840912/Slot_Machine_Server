import { ReturnNormalOdds, ReturnOverallOdds, ReturnGuraOdds, ReturnAmeOdds, ReturnAnySevenOdds } from './oddsNormal'
import { Odds } from "./Odds";

let _eachLineIndexList: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
]

export function GetMultiples(board: number[]): number {
    var oddsArr: Array<Odds> = [];
    oddsArr = NumConvertToOdds(board);

    var multiple = 0;

    multiple = CalcAllTheSame(oddsArr);

    if (multiple > 0) {
        return multiple;
    }
    _eachLineIndexList.forEach(element => {


        var line: Array<Odds> = [element.length];


        for (var i = 0; i < element.length; i++) {
            line[i] = oddsArr[element[i]];
        }

        multiple += CalcWinLine(line);
    });

    multiple += CalcBoardSevenCount(oddsArr);

    return multiple;
}

function NumConvertToOdds(convertThing: number[]): Odds[] {
    var oddsArr: Odds[] = [convertThing.length];

    for (var i = 0; i < convertThing.length; i++) {
        oddsArr[i] = convertThing[i] as Odds;
    }
    return oddsArr;
}

function CalcAllTheSame(thing: Odds[]): number {
    var numCount = 0;

    thing.forEach(element => {
        if (element === thing[0]) {
            numCount++
        }
    });


    if (numCount == thing.length) {
        return ReturnNormalOdds(thing[0]);
    }

    return CalcSimilar(thing);
}

function CalcSimilar(thing: Odds[]): number {

    var oddsType: Odds = CalcEachCount(thing);

    return oddsType == Odds.none ? 0 : ReturnOverallOdds(oddsType);
}

function CalcBoardSevenCount(thing: Odds[]): number {
    var countRedSeven = 0;
    var countBlueSeven = 0;

    thing.forEach(element => {
        if (element == Odds.gura) {
            countRedSeven++
        }
        if (element == Odds.ame) {
            countBlueSeven++
        }
    });

    if (countRedSeven > 0 && countBlueSeven > 0) {
        return ReturnAnySevenOdds(countRedSeven + countBlueSeven);
    }
    else if (countRedSeven == 0 && countBlueSeven > 1) {
        return ReturnAmeOdds(countBlueSeven);
    }
    else if (countRedSeven > 1 && countBlueSeven == 0) {
        return ReturnGuraOdds(countRedSeven);
    }
    return 0;
}

function CalcWinLine(thing: Odds[]): number {
    var oddsType: Odds = CalcEachCount(thing);

    if (thing[0] == thing[1] && thing[0] == thing[2]) {
        return ReturnNormalOdds(thing[0]);
    }
    else if (oddsType == Odds.anySeven || oddsType == Odds.anyBar) {
        return ReturnNormalOdds(oddsType);
    }
    else if (thing[0] == Odds.hololive) {
        return thing[0] == thing[1] ? 5 : 2;
    }
    return 0;
}

function CalcEachCount(odds: Odds[]): Odds {
    var countSeven = 0;
    var countBar = 0;
    var countFruit = 0;


    odds.forEach(element => {
        if (element == Odds.gura || element == Odds.ame) {
            countSeven++;
        } else if (element == Odds.ina || element == Odds.kronii || element == Odds.mumei) {
            countBar++;
        } else if (element == Odds.sana) {

        } else {
            countFruit++;
        }
    });


    if (countSeven == odds.length) {
        return Odds.anySeven;
    }
    else if (countBar == odds.length) {
        return Odds.anyBar;
    }
    else if (countFruit == odds.length) {
        return Odds.anyFruit;
    }
    else {
        return Odds.none;
    }
}

