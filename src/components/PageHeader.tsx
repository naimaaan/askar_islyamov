type Props = {
	title: string
	description?: string
	eyebrow?: string
}

export default function PageHeader({ title, description, eyebrow }: Props) {
	return <header className='page-header'>
		{eyebrow && <p className='eyebrow mb-3'>{eyebrow}</p>}
		<h1 className='page-title'>{title}</h1>
		{description && <p className='text-lead mt-5'>{description}</p>}
	</header>
}
