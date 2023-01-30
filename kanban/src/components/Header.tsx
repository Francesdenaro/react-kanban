import AddColumn from './AddColumn'

const Header = () => {
	return (
		<div className='flex justify-between p-5'>
			<h1 className='text-3xl font-semibold text-white'>Welcome User!</h1>
			<div className='flex gap-5'>
				<AddColumn />
			</div>
		</div>
	)
}
export default Header
