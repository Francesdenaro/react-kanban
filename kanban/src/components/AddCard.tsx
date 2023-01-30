import { useState } from 'react'
import ActionButton from './ActionButton'

const AddCard = ({ columnId }: { columnId: string }) => {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const addCard = async () => {
		console.log(title, description, columnId)
		const res = await fetch('http://localhost:8080/api/cards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				description: description,
				column: columnId,
			}),
		})
		if (res.status === 201) {
			setTitle('')
			setDescription('')
		}
	}

	return (
		<>
			{open ? (
				<div
					className='fixed inset-0 bg-black bg-opacity-50'
					onClick={() => setOpen(false)}
				></div>
			) : null}
			<ActionButton
				text='+ Add card'
				action={() => setOpen(true)}
				color='cyan'
			/>
			<dialog className='rounded-lg p-10 shadow-2xl' open={open}>
				<form
					className='flex flex-col gap-4'
					onSubmit={e => {
						e.preventDefault()
						addCard()
					}}
				>
					<h3 className='text-2xl font-bold'>Add new card</h3>
					<label className='flex flex-col' htmlFor='title'>
						Title
						<input
							className='rounded-lg shadow'
							type='text'
							id='title'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</label>
					<label className='flex flex-col' htmlFor='description'>
						Description
						<input
							className='rounded-lg shadow'
							type='text'
							id='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</label>
					<button
						className='rounded-lg bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-400'
						type='submit'
					>
						Add
					</button>
				</form>
			</dialog>
		</>
	)
}
export default AddCard
