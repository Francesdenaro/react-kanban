import { createContext, useContext, useEffect, useState } from 'react'
import { KanbanContext } from '../App'
import KanbanColumn from './KanbanColumn'
import CardModal from './CardModal'
import { Column } from './Types'

export const ColumnContext = createContext({
	refreshCards: false,
	setRefreshCards: (refreshCards: boolean) => {},
})

const Kanban = () => {
	const [columns, setColumns] = useState<Column[]>([])
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [error, setError] = useState()
	const [refreshCards, setRefreshCards] = useState<boolean>(false)
	const ctx = useContext(KanbanContext)

	useEffect(() => {
		fetch('http://localhost:8080/api/columns')
			.then(res => res.json())
			.then(
				result => {
					setColumns(result)
					setIsLoaded(true)
				},
				error => {
					console.log(error)
					setError(error)
					setIsLoaded(true)
				}
			)
	}, [ctx.refreshColumns])

	if (error) {
		console.error(error)
		return <div>Ops something happened</div>
	}

	return (
		<ColumnContext.Provider value={{ refreshCards, setRefreshCards }}>
			<main className='flex h-full w-full gap-6 overflow-scroll rounded-xl bg-blue-200 p-8 shadow-inner'>
				{isLoaded &&
					columns.map((col: Column) => (
						<KanbanColumn columnId={col._id} key={col._id} name={col.name} />
					))}
			</main>
		</ColumnContext.Provider>
	)
}
export default Kanban
