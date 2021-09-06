export class DateModel {

    hour: number= 0;
    minute: string= "";
    seconds: string= "";
    time: string= "";
    weekDay: string= "";
    date: string= "";
    

    public constructor(init?: Partial<DateModel>){
        Object.assign(this, init)
    }
}