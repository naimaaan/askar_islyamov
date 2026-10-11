import type { Locale } from '@/lib/i18n'

export const institutions = {
  ru: {
    college: 'Восточно-Казахстанский гуманитарный колледж имени Абая',
    school: 'Средняя школа имени Абая села Ақжар Тарбагатайского района',
  },
  kz: {
    college: 'Абай атындағы Шығыс Қазақстан гуманитарлық колледжі',
    school: 'Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебі',
  },
  en: {
    college: 'Abai East Kazakhstan Humanitarian College',
    school: 'Abai Secondary School in Akzhar, Tarbagatai district',
  },
} satisfies Record<Locale, { college: string; school: string }>
