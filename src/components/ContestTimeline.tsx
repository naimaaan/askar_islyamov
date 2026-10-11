import { CheckCircle2, Circle } from 'lucide-react'

interface TimelineEvent {
	year: string
	status: string
	completed: boolean
}

export default function ContestTimeline({
	events,
}: {
	events: readonly TimelineEvent[]
}) {
	return (
		<div className='grid grid-cols-3 gap-3 py-6 sm:gap-8'>
			{events.map((event, index) => (
				<div key={index} className='flex min-w-0 flex-col items-center text-center'>
					<div className='mb-2'>
						{event.completed ? (
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
