import { useContext, useEffect, useState } from 'react'
import AddCard from './AddCard'
import { ColumnContext } from './Kanban'
import KanbanCard from './KanbanCard'
import { Card } from './Types'

interface Props {
	name: string
	columnId: string
}

const KanbanColumn = ({ name, columnId }: Props) => {
	const [dropArea, setDropArea] = useState(false)
	const [cards, setCards] = useState<Card[]>([])
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [error, setError] = useState()
	const ctx = useContext(ColumnContext)

	useEffect(() => {
		fetch(`https://kanban-backend-chi.vercel.app/api/cards/${columnId}`)
			.then(res => res.json())
			.then(
				result => {
					setCards(result)
					setIsLoaded(true)
					console.log('cards')
				},
				error => {
					console.log(error)
					setError(error)
					setIsLoaded(true)
				}
			)
	}, [ctx.refreshCards])

	const handleDrop = async (cardId: string, targetId: string) => {
		try {
			await fetch(`https://kanban-backend-chi.vercel.app/api/cards/${cardId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ columnId: targetId }),
			})
			ctx.setRefreshCards(!ctx.refreshCards)
		} catch (error) {
			console.log(error)
		}
	}

	if (error) {
		console.error(error)
		return <div>Ops something unexpected happened</div>
	}

	return (
		<div
			onDragOver={e => {
				e.preventDefault()
				setDropArea(true)
			}}
			onDragLeave={() => {
				setDropArea(false)
			}}
			onDrop={e => {
				handleDrop(e.dataTransfer.getData('id'), columnId)
				setDropArea(false)
			}}
			className={`${
				dropArea ? 'bg-sky-400' : 'bg-blue-100'
			} flex h-full w-80 shrink-0 flex-col gap-4 overflow-scroll rounded-xl p-6 shadow-lg transition-colors`}
		>
			<h2 className='select-none text-lg font-bold uppercase text-slate-700'>
				{name}
			</h2>
			{isLoaded &&
				cards.map((card: Card) => <KanbanCard key={card._id} data={card} />)}
			<AddCard columnId={columnId} />
		</div>
	)
}
export default KanbanColumn
