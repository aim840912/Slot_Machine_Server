//產生min到max之間的亂數

export function GenerateRandomNum(min: number, max: number): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

