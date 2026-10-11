import { type Locale } from '@/lib/i18n'
import type { PhotoFrame } from '@/lib/photo-frame'
import { institutions } from '@/content/institutions'
import { contestContent } from '@/content/contest'

type Translation<T> = Record<Locale, T>
export type NewsCategory = 'school' | 'college' | 'meetings' | 'contest'
export type NewsPhoto = { src: string; caption: Translation<string>; note?: Translation<string>; document?: boolean; frame?: PhotoFrame; aspectRatio?: number; position?: string }
export type NewsVideo = { src: string; poster: string; caption: Translation<string>; duration: string; portrait?: boolean; preview?: string }
export type NewsInset = { photo: NewsPhoto; title: Translation<string>; text: Translation<string> }
export type NewsArticle = {
  slug: string
  category: NewsCategory
  date?: string
  dateEnd?: string
  cover: string
  coverPosition?: string
  title: Translation<string>
  summary: Translation<string>
  body: Translation<string[]>
  bodyHeadings?: Translation<Record<number, string>>
  inlinePhotos?: { after: number; photo: NewsPhoto }[]
  inset?: NewsInset
  photos: NewsPhoto[]
  showPhotoCaptions?: boolean
  video?: NewsVideo
  report?: 'contest'
  videoDuration?: string
}

const tr = <T,>(ru: T, kz: T, en: T): Translation<T> => ({ ru, kz, en })
const asset = (name: string) => `/images/news/${name}.webp`
const photo = (name: string, ru: string, kz: string, en: string, document = false): NewsPhoto => ({ src: asset(name), caption: tr(ru, kz, en), document })
const framed = (item: NewsPhoto, aspectRatio: number, corners: PhotoFrame['corners'] = [[0, 0], [100, 0], [100, 100], [0, 100]]): NewsPhoto => ({ ...item, frame: { aspectRatio, corners } })

export const newsLabels = {
  ru: {
    title: 'Новости', eyebrow: 'События и встречи', description: 'В кабинетах имени Асқара Ислямова продолжается дело учителя: школьники изучают географию, студенты осваивают педагогику, а преподаватели делятся опытом.',
    featured: 'В центре внимания', feed: 'Главные события', all: 'Все события', read: 'Читать материал', back: 'Все новости', related: 'Другие события', photos: 'Фотографии', video: 'Видеорепортаж', original: 'Открыть оригинал',
    contestsTitle: 'Педагогические конкурсы', meetingsTitle: 'Педагогические встречи', carouselTitle: 'Продолжая дело учителя', carouselDescription: 'Познавательные часы, конкурсы педагогических эссе и круглые столы объединяют тех, кто продолжает педагогические традиции Асқара Ислямова.', carousel: 'Карусель',
    archive: 'Фотохроника', history: 'Два кабинета — одно наследие', college: institutions.ru.college, collegePlace: 'Усть-Каменогорск', collegeText: 'Кабинет «Тәрбие жұмысының теориясы мен әдістемесі» открыт в 2021 году. От имени потомков учреждена стипендия для студентов колледжа.', school: institutions.ru.school, schoolPlace: 'Ақжар, Тарбагатайский район', schoolText: 'Кабинет географии имени Асқара Ислямова открыт в 2022 году.', biography: 'История жизни и наследия',
    categories: { school: 'Школа и география', college: 'Жизнь колледжа', meetings: 'Встречи и мероприятия', contest: 'Конкурсы' },
  },
  kz: {
    title: 'Жаңалықтар', eyebrow: 'Оқиғалар мен кездесулер', description: 'Асқар Ислямов атындағы кабинеттерде ұстаздың ісі жалғасуда: оқушылар географияны үйреніп, студенттер педагогиканы меңгеріп, оқытушылар тәжірибе бөліседі.',
    featured: 'Назарда', feed: 'Негізгі оқиғалар', all: 'Барлық оқиғалар', read: 'Толығырақ оқу', back: 'Барлық жаңалықтар', related: 'Басқа оқиғалар', photos: 'Фотосуреттер', video: 'Бейнерепортаж', original: 'Түпнұсқаны ашу',
    contestsTitle: 'Педагогикалық байқаулар', meetingsTitle: 'Педагогикалық кездесулер', carouselTitle: 'Ұстаз жолын жалғастырып', carouselDescription: 'Танымдық сағаттар, педагогикалық эссе байқаулары мен дөңгелек үстелдер Асқар Ислямовтың ұстаздық дәстүрін жалғастыратын жандарды біріктіреді.', carousel: 'Карусель',
    archive: 'Фотошежіре', history: 'Екі кабинет — ортақ мұра', college: institutions.kz.college, collegePlace: 'Өскемен', collegeText: '«Тәрбие жұмысының теориясы мен әдістемесі» кабинеті 2021 жылы ашылды. Ұрпақтары атынан колледж студенттеріне шәкіртақы тағайындалды.', school: institutions.kz.school, schoolPlace: 'Ақжар, Тарбағатай ауданы', schoolText: 'Асқар Ислямов атындағы география кабинеті 2022 жылы ашылды.', biography: 'Өмір жолы мен мұрасы',
    categories: { school: 'Мектеп және география', college: 'Колледж өмірі', meetings: 'Кездесулер мен іс-шаралар', contest: 'Байқаулар' },
  },
  en: {
    title: 'News', eyebrow: 'Events and encounters', description: 'Asqar Islyamov’s work continues in the classrooms bearing his name: pupils study geography, students learn pedagogy and educators share their experience.',
    featured: 'In focus', feed: 'Key events', all: 'All events', read: 'Read story', back: 'All news', related: 'More events', photos: 'Photographs', video: 'Video report', original: 'Open original',
    contestsTitle: 'Pedagogical contests', meetingsTitle: 'Meetings of educators', carouselTitle: 'Continuing the teacher’s work', carouselDescription: 'Educational sessions, pedagogical essay contests and round tables bring together people who carry on Asqar Islyamov’s teaching traditions.', carousel: 'Carousel',
    archive: 'Photo journal', history: 'Two classrooms, a shared legacy', college: institutions.en.college, collegePlace: 'Ust-Kamenogorsk', collegeText: 'The Theory and Methodology of Educational Work classroom opened in 2021. His descendants also established a scholarship for college students.', school: institutions.en.school, schoolPlace: 'Akzhar, Tarbagatai district', schoolText: 'The geography classroom named after Asqar Islyamov opened in 2022.', biography: 'His life and legacy',
    categories: { school: 'School and geography', college: 'College life', meetings: 'Meetings and events', contest: 'Contests' },
  },
} satisfies Record<Locale, { categories: Record<NewsCategory, string>; [key: string]: string | Record<NewsCategory, string> }>

// Dates describe the supplied event/document, not the date it was uploaded.
// Year-only and undated materials retain their original level of precision.
export const newsArticles: NewsArticle[] = [
  {
    slug: 'geography-olympiad-2025', category: 'school', date: '2025-04-29', cover: asset('geography-olympiad-2025'),
    title: tr('Районная олимпиада по географии имени Асқара Ислямова', 'Асқар Ислямов атындағы аудандық география олимпиадасы', 'District geography olympiad named after Asqar Islyamov'),
    summary: tr('29 апреля 2025 года ученики 9–11 классов встретились в средней школе имени Абая села Ақжар Тарбагатайского района на районной олимпиаде по географии.', '2025 жылғы 29 сәуірде 9–11 сынып оқушылары Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебінде аудандық география олимпиадасына қатысты.', 'On 29 April 2025, pupils in grades 9–11 gathered at Abai Secondary School in Akzhar, Tarbagatai district, for the district geography olympiad.'),
    body: tr(
      ['В средней школе имени Абая села Ақжар Тарбагатайского района прошла районная олимпиада по географии имени Асқара Жұмағұлұлы Ислямова. Ученики 9–11 классов проверили свои знания, выполняя письменные задания по предмету.', 'Олимпиада продолжает дело учителя географии, чьё имя носит школьный кабинет. Встреча участников и выступления педагогов связали учебное состязание с памятью об Асқаре Ислямове и его вкладе в образование.'],
      ['Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебінде Асқар Жұмағұлұлы Ислямов атындағы аудандық география олимпиадасы өтті. 9–11 сынып оқушылары пән бойынша жазбаша тапсырмаларды орындап, білімдерін сынады.', 'Олимпиада мектеп кабинетіне есімі берілген география мұғалімінің ісін жалғастырады. Қатысушылар кездесуі мен педагогтердің сөз сөйлеуі білім сайысын Асқар Ислямовтың өнегесімен және білім беру ісіне қосқан үлесімен ұштастырды.'],
      ['Abai Secondary School in Akzhar, Tarbagatai district, hosted the district geography olympiad named after Asqar Islyamov. Pupils in grades 9–11 tested their knowledge through written geography tasks.', 'The olympiad carries on the work of the geography teacher whose name the school classroom bears. Participants’ gathering and educators’ presentations connected the competition with his contribution to education.']),
    photos: [photo('geography-olympiad-announcement-2025', 'Слайд районной олимпиады: 9–11 классы, 29 апреля 2025 года.', 'Аудандық олимпиада слайды: 9–11 сыныптар, 2025 жылғы 29 сәуір.', 'Olympiad slide: grades 9–11, 29 April 2025.', true)],
    video: { src: '/videos/news/geography-olympiad-2025.mp4', preview: '/videos/previews/geography-olympiad-2025.mp4', poster: asset('geography-olympiad-2025'), duration: '1:33', caption: tr('Олимпиада: выступления и выполнение заданий школьниками.', 'Олимпиада: сөз сөйлеулер және оқушылардың тапсырма орындауы.', 'Olympiad presentations and pupils working on their tasks.') },
  },
  {
    slug: 'college-classroom-opening', category: 'college', date: '2021', cover: '/images/колледж7.jpeg',
    title: tr('Открытие первого кабинета имени Асқара Ислямова', 'Асқар Ислямов атындағы алғашқы кабинеттің ашылуы', 'The first classroom named after Asqar Islyamov opens'),
    summary: tr('В 2021 году в Восточно-Казахстанском гуманитарном колледже имени Абая открыт кабинет «Тәрбие жұмысының теориясы мен әдістемесі» имени Асқара Ислямова.', '2021 жылы Абай атындағы Шығыс Қазақстан гуманитарлық колледжінде Асқар Ислямов атындағы «Тәрбие жұмысының теориясы мен әдістемесі» кабинеті ашылды.', 'In 2021, Abai East Kazakhstan Humanitarian College opened the Theory and Methodology of Educational Work classroom named after Asqar Islyamov.'),
    body: tr(
      ['«Тәрбие жұмысының теориясы мен әдістемесі» стал первым кабинетом имени Асқара Ислямова. Он посвящён педагогическому наследию заслуженного учителя и подготовке будущих педагогов.', 'От имени потомков Асқара Ислямова для студентов колледжа учреждена стипендия. Поддержка будущих учителей продолжает его заботу об образовании и воспитании нового поколения.', 'Кабинет стал местом профессионального общения. 19 апреля 2022 года здесь состоялся круглый стол «Тағылымы мол тарихи тұлға», посвящённый педагогическому мастерству, учительской династии и вкладу Асқара Ислямова в образование.', '25 февраля 2025 года в рамках недели педагогики и психологии прошёл познавательный час «Асқар Ислямовтың ұстаздық келбеті». Студенты выступали, обсуждали педагогические идеи и работали в группах, продолжая знакомство с наследием учителя.'],
      ['«Тәрбие жұмысының теориясы мен әдістемесі» Асқар Ислямовтың есімі берілген алғашқы кабинет болды. Кабинет еңбек сіңірген ұстаздың педагогикалық мұрасына және болашақ педагогтерді даярлауға арналған.', 'Асқар Ислямовтың ұрпақтары атынан колледж студенттеріне шәкіртақы тағайындалды. Болашақ мұғалімдерге көрсетілген қолдау ұстаздың білім мен ұрпақ тәрбиесіне деген қамқорлығын жалғастырады.', 'Кабинет кәсіби пікір алмасу орнына айналды. 2022 жылғы 19 сәуірде мұнда педагогикалық шеберлікке, ұстаздар әулетіне және Асқар Ислямовтың білім беру ісіне қосқан үлесіне арналған «Тағылымы мол тарихи тұлға» дөңгелек үстелі өтті.', '2025 жылғы 25 ақпанда педагогика және психология апталығы аясында «Асқар Ислямовтың ұстаздық келбеті» танымдық сағаты өтті. Студенттер сөз сөйлеп, педагогикалық идеяларды талқылап, топтарда жұмыс істеу арқылы ұстаз мұрасымен танысты.'],
      ['The Theory and Methodology of Educational Work classroom was the first to bear Asqar Islyamov’s name. It honours the distinguished teacher’s legacy and supports the education of future teachers.', 'His descendants established a scholarship for college students. This support for future teachers carries on his commitment to education and the upbringing of a new generation.', 'The classroom became a meeting place for educators. On 19 April 2022, it hosted the round table “Тағылымы мол тарихи тұлға”, discussing teaching, the family’s educational dynasty and Asqar Islyamov’s contribution to education.', 'On 25 February 2025, pedagogy and psychology week included the session “Асқар Ислямовтың ұстаздық келбеті”. Students gave presentations, discussed educational ideas and worked in groups as they explored his legacy.']),
    photos: [
      photo('college-classroom-plaque', 'Табличка кабинета «Тәрбие жұмысының теориясы мен әдістемесі».', '«Тәрбие жұмысының теориясы мен әдістемесі» кабинетінің тақтайшасы.', 'The Theory and Methodology of Educational Work classroom plaque.', true),
    ],
    bodyHeadings: tr({ 0: 'Открытие кабинета', 1: 'Поддержка будущих учителей', 2: 'Работа кабинета' }, { 0: 'Кабинеттің ашылуы', 1: 'Болашақ ұстаздарға қолдау', 2: 'Кабинет жұмысы' }, { 0: 'Opening the classroom', 1: 'Supporting future teachers', 2: 'The classroom in use' }),
    inlinePhotos: [{ after: 1, photo: { src: '/images/event-2026/event-04.jpeg', document: true, aspectRatio: 4 / 3, caption: tr('Сертификат на стипендию от потомков Асқара Ислямова. Өскемен, 2021 год.', 'Асқар Ислямовтың ұрпақтары атынан тағайындалған шәкіртақы сертификаты. Өскемен, 2021 жыл.', 'Scholarship certificate from Asqar Islyamov’s descendants. Ust-Kamenogorsk, 2021.') } }],
    video: { src: '/videos/news/college-teaching-hour-2025.mp4', poster: asset('college-teaching-hour-2025'), duration: '1:16', caption: tr('«Асқар Ислямовтың ұстаздық келбеті» — 25 февраля 2025 года.', '«Асқар Ислямовтың ұстаздық келбеті» — 2025 жылғы 25 ақпан.', '“Асқар Ислямовтың ұстаздық келбеті” — 25 February 2025.') },
  },
  {
    slug: 'school-geography-classroom', category: 'school', date: '2022', cover: asset('school-geography-classroom'),
    inset: {
      photo: framed(photo('geography-plaque-design', 'Именная табличка кабинета географии.', 'География кабинетінің атаулы тақтайшасы.', 'The geography classroom’s name plaque.', true), 4 / 3, [[6.59, 8.94], [100, 8.94], [100, 100], [6.59, 100]]),
      title: tr('Имя кабинета', 'Ұстаз есімі', 'The classroom’s name'),
      text: tr('Кабинет носит имя Асқара Ислямова — заслуженного учителя Казахской ССР и отличника народного просвещения СССР. Его дело продолжается в обучении и воспитании новых поколений школьников.', 'География кабинетіне Қазақ КСР-інің еңбек сіңірген мұғалімі, КСРО халық ағарту ісінің үздігі Асқар Ислямовтың есімі берілді. Ұстаздың ісі жаңа ұрпаққа білім мен тәрбие беру арқылы жалғасуда.', 'The classroom bears the name of Asqar Islyamov, an Honoured Teacher of the Kazakh SSR and a recipient of the USSR’s Excellence in Public Education distinction. His work continues in the education of new generations of pupils.'),
    },
    title: tr('Открытие кабинета географии имени Асқара Ислямова в Ақжаре', 'Ақжарда Асқар Ислямов атындағы география кабинетінің ашылуы', 'Opening the Asqar Islyamov geography classroom in Akzhar'),
    summary: tr('В 2022 году в средней школе имени Абая села Ақжар Тарбагатайского района открылся кабинет, посвящённый учителю географии и его педагогическому наследию.', '2022 жылы Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебінде география мұғалімінің есімі мен педагогикалық мұрасына арналған кабинет ашылды.', 'In 2022, Abai Secondary School in Akzhar, Tarbagatai district, opened a classroom honouring the geography teacher and his educational legacy.'),
    body: tr(
      ['Имя учителя географии Асқара Ислямова присвоили школьному кабинету. Открытие связало память о педагоге с повседневной школьной жизнью: его дело продолжается на уроках и предметных мероприятиях.', 'Географические карты, глобус и слова педагога о школе и воспитании связывают изучение предмета с его учительскими традициями. Кабинет служит учебным пространством, где ученики знакомятся с географией и наследием Асқара Ислямова.', 'Эту традицию продолжила районная олимпиада имени Асқара Ислямова: 29 апреля 2025 года в школе собрались участники из 9–11 классов.'],
      ['Мектептің география кабинетіне осы пәннің мұғалімі Асқар Ислямовтың есімі берілді. Кабинеттің ашылуы ұстазға деген құрметті мектеп өмірімен ұштастырды: оның ісі сабақтар мен пәндік іс-шараларда жалғасуда.', 'Географиялық карталар, глобус және ұстаздың мектеп пен тәрбие туралы сөздері пәнді оқытуды оның педагогикалық өнегесімен ұштастырады. Оқушылар мұнда географияны үйреніп, Асқар Ислямовтың ұстаздық мұрасымен танысады.', 'Бұл дәстүр Асқар Ислямов атындағы аудандық олимпиадада жалғасты: 2025 жылғы 29 сәуірде мектепке 9–11 сынып оқушылары жиналды.'],
      ['The school’s geography classroom was named after geography teacher Asqar Islyamov. Its opening connected remembrance of the educator with daily school life, lessons and subject events.', 'Geographical maps, a globe and the educator’s words about school and upbringing connect the subject with his teaching traditions. The classroom provides a place for pupils to study geography and encounter his legacy.', 'The district olympiad named after Asqar Islyamov continued this tradition, bringing pupils in grades 9–11 to the school on 29 April 2025.']),
    photos: [photo('school-geography-classroom', 'Кабинет географии в средней школе имени Абая села Ақжар Тарбагатайского района.', 'Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебінің география кабинеті.', 'The geography classroom at Abai Secondary School in Akzhar, Tarbagatai district.')],
    bodyHeadings: tr({ 0: 'Открытие кабинета', 1: 'Учёба и мероприятия' }, { 0: 'Кабинеттің ашылуы', 1: 'Оқу және іс-шаралар' }, { 0: 'Opening the classroom', 1: 'Learning and events' }),
    video: { src: '/videos/news/school-classroom-ceremony.mp4', poster: asset('school-classroom-ceremony'), duration: '0:49', portrait: true, caption: tr('Торжественное открытие кабинета географии.', 'География кабинетінің салтанатты ашылуы.', 'The geography classroom opening ceremony.') },
  },
  {
    slug: 'pedagogical-meetings', category: 'meetings', cover: asset('pedagogical-contest-participants'), showPhotoCaptions: false,
    title: tr('Встречи, выступления и память об учителе', 'Кездесулер, баяндамалар және ұстазға тағзым', 'Meetings, presentations and remembrance'),
    summary: tr('Педагогическое наследие Асқара Ислямова объединяет учителей в обсуждении опыта, воспитания и ответственности перед учениками.', 'Асқар Ислямовтың педагогикалық мұрасы ұстаздарды тәжірибе, тәрбие және шәкірт алдындағы жауапкершілік туралы пікір алмасуға біріктіреді.', 'Asqar Islyamov’s educational legacy brings teachers together to discuss experience, upbringing and their responsibility to pupils.'),
    body: tr(
      ['Профессиональные встречи, круглые столы и выступления посвящены делу Асқара Ислямова и вопросам, которые объединяют педагогов: как передать знания, воспитать личность и сохранить доверие между учителем и учеником.', 'Педагогические эссе и обсуждения учительского опыта продолжают разговор о его наследии. Память о заслуженном учителе живёт в общении коллег, в уважении к педагогическим традициям и в стремлении передать их следующему поколению.'],
      ['Кәсіби кездесулер, дөңгелек үстелдер мен баяндамалар Асқар Ислямовтың ұстаздық жолына және педагогтерге ортақ мәселелерге арналады: білім беру, тұлға тәрбиелеу, мұғалім мен шәкірт арасындағы сенімді сақтау.', 'Педагогикалық эсселер мен ұстаздық тәжірибе туралы пікір алмасу оның мұрасы жөніндегі әңгімені жалғастырады. Еңбек сіңірген мұғалімге деген құрмет әріптестердің басқосуынан, педагогикалық дәстүрді бағалаудан және оны келесі ұрпаққа жеткізуге ұмтылудан көрінеді.'],
      ['Professional meetings, round tables and presentations honour Asqar Islyamov’s work and address questions shared by educators: how to pass on knowledge, nurture a person’s growth and maintain trust between teacher and pupil.', 'Pedagogical essays and discussions of teaching experience continue the conversation about his legacy. His memory lives on in exchanges between colleagues, respect for educational traditions and the commitment to pass them to the next generation.']),
    photos: [
      { ...photo('pedagogical-contest-participants', 'Групповая фотография участников педагогического мероприятия.', 'Педагогикалық іс-шара қатысушыларының топтық фотосуреті.', 'Group photograph of participants at an educational event.'), aspectRatio: 4 / 3 },
      { ...photo('pedagogical-round-table', 'Участники встречи за круглым столом.', 'Дөңгелек үстел басындағы кездесу қатысушылары.', 'Participants gathered around a round table.'), aspectRatio: 3 / 4 },
      { ...photo('pedagogical-meeting', 'Выступление перед участниками педагогической встречи.', 'Педагогикалық кездесу қатысушылары алдындағы сөз сөйлеу.', 'A presentation to participants at an educational meeting.'), aspectRatio: 3 / 4 },
      { ...photo('memorial-exhibition', 'Выставка фотографий и материалов о жизни Асқара Ислямова.', 'Асқар Ислямовтың өміріне арналған фотосуреттер мен материалдар көрмесі.', 'An exhibition of photographs and materials about Asqar Islyamov.'), aspectRatio: 3 / 4 },
      { ...photo('contest-guests', 'Участники памятного мероприятия', 'Еске алу іс-шарасының қатысушылары', 'Participants at a commemorative event'), aspectRatio: 1186 / 1599 },
      { ...photo('memorial-meeting-guests', 'Гости памятной встречи.', 'Еске алу кездесуінің қонақтары.', 'Guests at a commemorative gathering.'), aspectRatio: 3 / 4 },
    ],
  },
  {
    slug: 'pedagogical-essay-contest', category: 'contest', date: '2024-12-11', dateEnd: '2024-12-12', report: 'contest', videoDuration: '2:09',
    cover: '/images/event-2026/event-01.jpg',
    title: tr(contestContent.ru.title, contestContent.kz.title, contestContent.en.title),
    summary: tr(contestContent.ru.description, contestContent.kz.description, contestContent.en.description),
    body: tr(
      ['Педагоги организаций технического и профессионального образования представили эссе на тему «Ұлттық білім беру моделі менің көзқарасыммен» — своё видение национальной модели образования. Конкурс стал площадкой для обмена педагогическими идеями и опытом.', 'Победители получили дипломы I, II и III степени и сертификаты Министерства просвещения Республики Казахстан. При поддержке семьи Ислямовых педагогам также вручили денежные сертификаты. Ниже представлены итоги 2024 года и фотохроника конкурсных мероприятий.'],
      ['Техникалық және кәсіптік білім беру ұйымдарының педагогтері «Ұлттық білім беру моделі менің көзқарасыммен» тақырыбында эссе жазып, білім беру туралы ойлары мен тәжірибесін ортаға салды. Байқау педагогикалық идеялармен алмасуға мүмкіндік берді.', 'Жеңімпаздар Қазақстан Республикасы Оқу-ағарту министрлігінің I, II және III дәрежелі дипломдары мен сертификаттарына ие болды. Ислямовтар әулетінің қолдауымен қаржылай сертификаттар да тапсырылды. Төменде 2024 жылғы қорытынды мен байқау іс-шараларының фотошежіресі берілген.'],
      ['Teachers from technical and vocational education institutions wrote essays on “Ұлттық білім беру моделі менің көзқарасыммен” — their vision of a national education model. The contest provided an opportunity to share educational ideas and teaching experience.', 'Winners received first-, second- and third-degree diplomas and certificates from Kazakhstan’s Ministry of Education. The Islyamov family also sponsored financial awards. The 2024 results and photographs from contest events appear below.']),
    photos: [],
  },
]

// Supporting documents share a carousel, without separate single-image stories.
// The invitation's 2024 date remains a document date, not the founding year.
export const newsDocuments: NewsPhoto[] = [
  framed(photo('pedagogical-essay-collection-2025', '«Үздік педагогикалық эссе» — сборник 2025 года.', '«Үздік педагогикалық эссе» — 2025 жылғы жинақ.', '“Best Pedagogical Essay” — the 2025 collection.', true), Math.SQRT1_2, [[5.17, 8.13], [82.83, 5.13], [85.67, 90.5], [10.33, 87.38]]),
  framed(photo('college-teaching-hour-invitation-2025', '«Асқар Ислямовтың ұстаздық келбеті» — 25 февраля 2025 года.', '«Асқар Ислямовтың ұстаздық келбеті» — 2025 жылғы 25 ақпан.', '“Асқар Ислямовтың ұстаздық келбеті” — 25 February 2025.', true), 1142 / 1600),
  { ...framed(photo('school-invitation-2024', 'Школьное приглашение — 29 апреля 2024 года.', 'Мектеп шақыруы — 2024 жылғы 29 сәуір.', 'School invitation — 29 April 2024.', true), 1064 / 1600), note: tr('Средняя школа имени Абая села Ақжар Тарбагатайского района. Дата на приглашении относится к документу; кабинет основан в 2022 году.', 'Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебі. Бұл — құжаттағы күн; кабинет 2022 жылы ашылған.', 'Abai Secondary School in Akzhar, Tarbagatai district. This is the date on the invitation; the classroom was founded in 2022.') },
  framed(photo('regional-essay-programme-2022', '«Үздік педагогикалық эссе» — программа, 28 сентября 2022 года.', '«Үздік педагогикалық эссе» — бағдарлама, 2022 жылғы 28 қыркүйек.', '“Best Pedagogical Essay” — programme, 28 September 2022.', true), Math.SQRT2, [[2.66, 0], [80.47, 3.19], [78.13, 92.92], [6.09, 96.53]]),
  framed(photo('round-table-programme-cover-2022', '«Тағылымы мол тарихи тұлға» — 19 апреля 2022 года.', '«Тағылымы мол тарихи тұлға» — 2022 жылғы 19 сәуір.', '“Тағылымы мол тарихи тұлға” — 19 April 2022.', true), Math.SQRT1_2, [[19.72, 16.09], [83.06, 15.08], [86.11, 65.55], [15.14, 65.55]]),
  framed(photo('round-table-programme-inside-2022', '«Тағылымы мол тарихи тұлға» — программа выступлений.', '«Тағылымы мол тарихи тұлға» — баяндамалар бағдарламасы.', '“Тағылымы мол тарихи тұлға” — presentation schedule.', true), Math.SQRT2, [[0, 21.88], [100, 18.2], [100, 64.06], [0, 65.86]]),
]

export function getNewsArticles() {
  return [...newsArticles].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function newsDate(article: NewsArticle, locale: Locale) {
  if (!article.date) return newsLabels[locale].archive
  if (article.date.length === 4) return article.date
  // Explicit month names keep Kazakh dates identical in browsers and Node ICU.
  const months = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    kz: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  }
  const [year, month, day] = article.date.split('-').map(Number)
  const end = article.dateEnd?.split('-').map(Number)
  const days = end && end[0] === year && end[1] === month ? `${day}–${end[2]}` : `${day}`
  const monthName = months[locale][month - 1]
  return locale === 'kz' ? `${year} ж. ${days} ${monthName}` : `${days} ${monthName} ${year}`
}
