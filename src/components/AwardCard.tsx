import { Award } from 'lucide-react'

interface AwardItem {
	title: string
	year: string
	description: string
	image: string
}

export default function AwardCard({ item }: { item: AwardItem }) {
	return (
		<div className='flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow'>
			<div className='w-full md:w-48 h-48 bg-slate-100 rounded-md flex-shrink-0 flex items-center justify-center text-slate-400'>
				<Award size={48} />
				{/* <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" /> */}
			</div>
			<div className='flex flex-col justify-center'>
				<span className='text-slate-500 font-medium mb-1'>{item.year}</span>
				<h3 className='text-xl font-serif font-semibold text-slate-900 mb-2'>
					{item.title}
				</h3>
				<p className='text-slate-600'>{item.description}</p>
			</div>
		</div>
	)
}
