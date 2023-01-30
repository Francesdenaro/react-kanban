import { createContext, useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Header from './components/Header'
import Kanban from './components/Kanban'
import CardModal from './components/CardModal'

export const KanbanContext = createContext({
	refreshColumns: false,
	setRefreshColumns: (refreshColumns: boolean) => {},
	setOpenModal: (refreshColumns: boolean) => {},
	setCardId: (cardId: string) => {},
})

function App() {
	const [refreshColumns, setRefreshColumns] = useState<boolean>(false)
	const [cardId, setCardId] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	let { cardUri } = useParams()

	useEffect(() => {
		console.log(openModal)
		if (cardUri) {
			setOpenModal(true)
			setCardId(cardUri)
		} else {
			setOpenModal(false)
		}
	}, [cardUri])

	return (
		<KanbanContext.Provider
			value={{ refreshColumns, setRefreshColumns, setOpenModal, setCardId }}
		>
			<div className='relative flex h-screen flex-col bg-sky-600 px-10 py-5'>
				<Header />
				<Kanban />
				{openModal && <CardModal cardId={cardId} isOpen={openModal} />}
			</div>
		</KanbanContext.Provider>
	)
}

const AppRoutes = () => (
	<Routes>
		<Route path='/' element={<App />}>
			<Route path=':cardUri' element={<App />} />
		</Route>
	</Routes>
)

export default AppRoutes
