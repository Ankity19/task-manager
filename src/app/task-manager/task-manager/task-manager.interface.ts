export interface CardDetail {
  cardName: string;

}
export interface listDetail {
  name: string;
  cards:Array<CardDetail>;
  isCardsFormOpen?:boolean
}
