import { CheckCircle2, Circle } from 'lucide-react'

interface TimelineEvent {
	year: string
	status: string
}

export default function ContestTimeline({
	events,
}: {
	events: TimelineEvent[]
}) {
	return (
		<div className='flex items-center justify-center space-x-4 md:space-x-12 py-8'>
			{events.map((event, index) => (
				<div key={index} className='flex flex-col items-center text-center'>
					<div className='mb-2'>
						{event.status.includes('Завершен') ||
						event.status.includes('Аяқталды') ? (
							<CheckCircle2 className='text-green-600' size={32} />
						) : (
							<Circle className='text-blue-600' size={32} />
						)}
					</div>
					<div className='font-bold text-slate-900'>{event.year}</div>
					<div className='text-sm text-slate-500'>{event.status}</div>
				</div>
			))}
		</div>
	)
}
