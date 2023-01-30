import { DragEvent, useContext, useState } from 'react'
import { ColumnContext } from './Kanban'
import { Card } from './Types'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
interface Props {
	data: Card
}

const KanbanCard = ({ data }: Props) => {
	const ctx = useContext(ColumnContext)

	const handleCardDrag = (e: DragEvent) => {
		// Getting card ID and parent ID
		e.dataTransfer.setData('id', data._id.toString())
	}
	const handleDelete = async (cardId: string) => {
		try {
			await fetch(`http://localhost:8080/api/cards/${cardId}`, {
				method: 'DELETE',
			})
			ctx.setRefreshCards(!ctx.refreshCards)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='group relative h-28 w-full rounded-lg bg-white shadow-lg transition-colors hover:bg-blue-50'>
			<Link
				className='flex h-full w-full flex-col gap-2 rounded-lg p-4'
				to={`/${data._id}`}
				draggable
				onDragStart={e => {
					handleCardDrag(e)
				}}
			>
				<h3 className='text-lg font-bold'>{data.title}</h3>
				<p className='text-sm'>{data.description}</p>
			</Link>
			<button
				className='absolute right-5 bottom-5 hidden group-hover:block'
				onClick={() => handleDelete(data._id)}
			>
				<FaTrash />
			</button>
		</div>
	)
}
export default KanbanCard
