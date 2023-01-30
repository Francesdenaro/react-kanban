export interface Column {
	name: string
	_id: string
	title: string
	children: Card[]
}
export interface Card {
	_id: string
	title: string
	description: string
	column: string
}
export enum ItemType {
	Card = 'Card',
	Column = 'Column',
}
