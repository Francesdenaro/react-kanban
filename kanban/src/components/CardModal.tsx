import { createContext, useContext, useEffect, useState } from 'react'
import { KanbanContext } from '../App'
import { Card } from './Types'

const CardModal = ({
	cardId,
	isOpen = false,
}: {
	cardId: string
	isOpen?: boolean
}) => {
	const [open, setOpen] = useState<boolean>(isOpen)
	const [card, setCard] = useState<Card | null>()
	const [columnName, setColumnName] = useState<string>('')
	const ctx = useContext(KanbanContext)

	const getColumnName = async (columnId: string) => {
		const res = await fetch(
			`http://localhost:8080/api/columns/single/${columnId}`
		)
		const column = await res.json()
		console.log(column)
		return column.name
	}

	useEffect(() => {
		fetch(`http://localhost:8080/api/cards/single/${cardId}`)
			.then(res => res.json())
			.then(
				result => {
					setCard(result)
					getColumnName(result.column).then(name => setColumnName(name))
				},
				error => {
					console.log(error)
					setCard(null)
					ctx.setOpenModal(false)
				}
			)
	}, [cardId])

	if (!card) {
		return <div>Ops, something unexpected happened</div>
	}

	const closeModal = () => {
		setOpen(false)
		ctx.setOpenModal(false)
	}

	return (
		<>
			{open ? (
				<div
					className='fixed inset-0 bg-black bg-opacity-50'
					onClick={closeModal}
				></div>
			) : null}
			<dialog
				className='top-1/2 w-2/3 -translate-y-1/2 rounded-lg p-10 shadow-2xl'
				open={open}
			>
				<article className='flex flex-col gap-8'>
					<div className='flex items-center justify-between'>
						<h2 className='text-2xl font-bold'>{card.title}</h2>
						<button className='text-3xl' onClick={closeModal}>
							X
						</button>
					</div>
					<section>
						<label className='font-bold'>Description</label>
						<p>{card.description}</p>
					</section>
					<section>
						<label className='mr-4 font-bold'>Currently in</label>
						<em className='rounded-md bg-sky-500 px-2 py-1 font-bold uppercase not-italic text-white'>
							{columnName}
						</em>
					</section>
				</article>
			</dialog>
		</>
	)
}
export default CardModal
