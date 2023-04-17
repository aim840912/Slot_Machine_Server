import { Odds } from "./Odds";

export function ReturnNormalOdds(thing: Odds): number {
    switch (thing) {
        case Odds.gura:
            return 300;
        case Odds.ame:
            return 200;
        case Odds.anySeven:
            return 50;
        case Odds.ina:
            return 100;
        case Odds.kronii:
            return 50;
        case Odds.mumei:
            return 30;
        case Odds.anyBar:
            return 10;
        case Odds.sana:
            return 20;
        case Odds.bae:
            return 18;
        case Odds.fauna:
            return 16;
        case Odds.irys:
            return 14;
        case Odds.hololive:
            return 10;
        default:
            return 0;
    }
}

export function ReturnOverallOdds(thing: Odds): number {
    switch (thing) {
        case Odds.gura:
            return 700;
        case Odds.ame:
            return 500;
        case Odds.anySeven:
            return 200;
        case Odds.ina:
            return 200;
        case Odds.kronii:
            return 100;
        case Odds.mumei:
            return 80;
        case Odds.anyBar:
            return 40;
        case Odds.sana:
            return 80;
        case Odds.bae:
            return 70;
        case Odds.fauna:
            return 60;
        case Odds.irys:
            return 50;
        case Odds.hololive:
            return 40;
        case Odds.anyFruit:
            return 15;
        default:
            return 0;
    }
}

export function ReturnGuraOdds(thing: number): number {
    switch (thing) {
        case 8:
            return 200;
        case 7:
            return 140;
        case 6:
            return 70;
        case 5:
            return 30;
        case 4:
            return 12;
        case 3:
            return 6;
        case 2:
            return 3;
        default:
            return 0;
    }
}
export function ReturnAmeOdds(thing: number): number {
    switch (thing) {
        case 8:
            return 150;
        case 7:
            return 100;
        case 6:
            return 50;
        case 5:
            return 20;
        case 4:
            return 8;
        case 3:
            return 4;
        case 2:
            return 2;
        default:
            return 0;
    }
}

export function ReturnAnySevenOdds(thing: number): number {
    switch (thing) {
        case 8:
            return 60;
        case 7:
            return 40;
        case 6:
            return 20;
        case 5:
            return 10;
        case 4:
            return 5;
        case 3:
            return 2;
        case 2:
            return 1;
        default:
            return 0;
    }
}