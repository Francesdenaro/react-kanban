import { useState, useContext } from 'react'
import { KanbanContext } from '../App'

const AddColumn = () => {
	const [name, setName] = useState('')
	const ctx = useContext(KanbanContext)
	const addColumn = async (name: string) => {
		let res = await fetch('https://kanban-backend-chi.vercel.app/api/columns', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		})

		if (res.status === 201) {
			setName('')
			ctx.setRefreshColumns(!ctx.refreshColumns)
		}
	}

	return (
		<div className='flex gap-5'>
			<input
				value={name}
				type='text'
				className='rounded-lg px-1 shadow-md'
				onChange={e => setName(e.target.value)}
			/>
			<button
				onClick={() => addColumn(name)}
				className='rounded-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-sky-400'
			>
				+ Add column
			</button>
		</div>
	)
}
export default AddColumn
