interface TimelineItem {
	year: string
	title: string
	description: string
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
	return (
		<div className='relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8 py-4'>
			{items.map((item, index) => (
				<div key={index} className='relative pl-8 md:pl-12'>
					<div className='absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-slate-300 bg-white' />
					<span className='text-sm font-bold text-slate-500 block mb-1'>
						{item.year}
					</span>
					<h3 className='text-lg font-serif font-semibold text-slate-900 mb-2'>
						{item.title}
					</h3>
					<p className='text-slate-600 leading-relaxed'>{item.description}</p>
				</div>
			))}
		</div>
	)
}
