interface Props {
	text: string
	action: Function
	color: string
}

const ActionButton = ({ text, action, color }: Props) => {
	const getColor = (color: string) => {
		return `bg-${color}-500`
	}
	return (
		<button
			onClick={() => {
				action()
			}}
			className={`rounded-lg ${getColor(color)} py-2 px-4 text-white`}
		>
			{text}
		</button>
	)
}
export default ActionButton
