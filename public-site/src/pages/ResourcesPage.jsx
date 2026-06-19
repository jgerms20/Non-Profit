import { ExternalLink, Newspaper, BookOpen, MapPin, Globe, Video, Headphones } from 'lucide-react'
import PageHero from '../components/PageHero'

const articles = [
  {
    category: 'South Carolina',
    items: [
      {
        title: 'An AI Divide Is Growing in Schools. This Camp Wants to Level the Playing Field',
        source: 'South Carolina Public Radio',
        url: 'https://www.southcarolinapublicradio.org/2025-08-19/an-ai-divide-is-growing-in-schools-this-camp-wants-to-level-the-playing-field',
        description:
          'How the AI skills gap is showing up in SC classrooms and what community-driven programs are doing about it.',
      },
      {
        title: "South Carolina Tech Industry Intensifies State's Economic Growth",
        source: 'Columbia Business Monthly',
        url: 'https://www.columbiabusinessmonthly.com/2024/10/14/509275/new-study-south-carolina-tech-industry-intensifies-state-s-economic-growth',
        description:
          "SC's tech economy is booming — but without AI literacy, many communities won't share in the growth.",
      },
      {
        title: 'South Carolina Nears End of Digital Divide',
        source: 'SC Office of Regulatory Staff',
        url: 'https://ors.sc.gov/news/south-carolina-nears-end-digital-divide',
        description:
          'Broadband access is expanding across SC — now the challenge shifts from connectivity to capability.',
      },
      {
        title: '2025-2026 Bill 3201: Computer Science Education Initiative Act',
        source: 'SC Legislature',
        url: 'https://www.scstatehouse.gov/sess126_2025-2026/bills/3201.htm',
        description:
          'Proposed legislation to expand computer science education in SC schools — a step toward broader AI literacy.',
      },
      {
        title: 'Palmetto Connect: Fostering Digital Inclusion in South Carolina',
        source: 'National Network of Libraries of Medicine',
        url: 'https://www.nnlm.gov/training/class/palmetto-connect-fostering-digital-inclusion-rural-south-carolina',
        description:
          'How SC libraries are leading digital inclusion efforts — a model for community-based AI education.',
      },
      {
        title: 'South Carolina Industry Recruitment Reaches $8.19 Billion in 2024',
        source: 'SC Department of Commerce',
        url: 'https://www.sccommerce.com/news/south-carolina-industry-recruitment-reaches-819-billion-2024',
        description:
          'Record investment flowing into SC — AI-literate communities are best positioned to benefit.',
      },
    ],
  },
  {
    category: 'Southeast US',
    items: [
      {
        title: 'Georgia State to Build AI Literacy Program for Underserved Communities',
        source: 'GovTech',
        url: 'https://www.govtech.com/education/higher-ed/georgia-state-to-build-ai-literacy-program-for-underserved-communities',
        description:
          'A peer program in Georgia building AI literacy in communities that need it most — exactly what SCAiL is doing in SC.',
      },
      {
        title: 'NC A&T Partnering in $25M Initiative to Boost AI Literacy Among Youth',
        source: 'WUNC / NC Public Radio',
        url: 'https://www.wunc.org/education/2024-11-26/nc-a-t-state-university-ai-literacy-google',
        description:
          'Major investment in youth AI literacy next door in North Carolina shows the momentum building across the Southeast.',
      },
      {
        title: 'aiEDU Program: AI Literacy for Underserved & Indigenous Students',
        source: 'GovTech',
        url: 'https://www.govtech.com/education/k-12/aiedu-program-to-improve-ai-literacy-for-rural-indigenous-students',
        description:
          'National programs reaching underserved communities with AI education — the model SCAiL adapts for South Carolina.',
      },
    ],
  },
  {
    category: 'National & Global',
    items: [
      {
        title: 'The AI Divide: Why Communities Are Being Left Behind',
        source: 'The Builder Bureau',
        url: 'https://thebuilderbureau.com/the-ai-divide-why-rural-communities-are-being-left-behind/',
        description:
          'A deep look at the growing gap between AI haves and have-nots — and why community-level programs matter.',
      },
      {
        title: 'Why AI Readiness Requires Digital Literacy and Inclusion',
        source: 'Brookings Institution',
        url: 'https://www.brookings.edu/articles/why-ai-readiness-requires-digital-literacy-and-inclusion/',
        description:
          'Brookings makes the case that AI readiness starts with literacy and inclusion — the foundation of SCAiL\'s approach.',
      },
      {
        title: 'AI Literacy and the New Digital Divide — A Global Call for Action',
        source: 'UNESCO',
        url: 'https://www.unesco.org/en/articles/ai-literacy-and-new-digital-divide-global-call-action',
        description:
          'UNESCO recognizes AI literacy as the next frontier of the digital divide. SCAiL answers that call locally.',
      },
    ],
  },
]

const videos = [
  {
    id: 'aR5N27GQfJk',
    title: 'The AI Daily Brief',
    creator: 'Nathaniel Whittemore',
    description:
      "Daily AI news and analysis — a fast, trustworthy way to stay current on what’s moving in the AI world.",
  },
  {
    id: 'TRjq7t2Ms5Y',
    title: 'AI Tools Weekly Roundup',
    creator: 'Matt Wolfe',
    description:
      'Matt covers the newest AI tools and practical ways to use them. Great for beginners and builders alike.',
  },
  {
    id: 'jvqFAi7vkBc',
    title: 'AI Explained',
    creator: 'AI Explained',
    description:
      'Deep, clear breakdowns of how AI models actually work — no hype, just solid understanding.',
  },
]

const podcasts = [
  {
    name: 'Lex Fridman Podcast',
    host: 'Lex Fridman',
    description:
      'Long-form conversations with AI researchers, founders, and scientists. Some of the deepest thinking on AI available anywhere.',
    listenUrl: 'https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  },
  {
    name: 'Hard Fork',
    host: 'Kevin Roose & Casey Newton · NYT',
    description:
      'The New York Times tech reporters break down the biggest stories in AI and tech — smart, accessible, and often funny.',
    listenUrl: 'https://open.spotify.com/show/44fllCS2FTFr2x2kjP9xeT',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  {
    name: 'The AI Podcast',
    host: 'NVIDIA',
    description:
      "NVIDIA's flagship podcast on AI applications, research breakthroughs, and how AI is reshaping industries.",
    listenUrl: 'https://open.spotify.com/show/0uNKjJFsNJpOe27vNGVBaD',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  {
    name: 'Practical AI',
    host: 'Changelog Media',
    description:
      'Making AI practical and accessible for developers and curious learners — real tools, real use cases, no fluff.',
    listenUrl: 'https://open.spotify.com/show/1LaCr5TFAgYPK5qHjP3XDp',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  },
]

const categoryIcons = {
  'South Carolina': MapPin,
  'Southeast US': BookOpen,
  'National & Global': Globe,
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageHero
        title="News &"
        accent="Resources"
        subtitle="The latest on AI literacy, South Carolina communities, and the digital divide"
      />

      {/* Videos */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-brand-navy flex items-center justify-center">
              <Video className="h-5 w-5 text-brand-teal" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                AI Creators &amp; Videos
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                The best YouTube voices for understanding AI right now
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5 flex flex-col gap-1 flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs font-medium text-brand-teal mb-1">{video.creator}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-brand-navy flex items-center justify-center">
              <Headphones className="h-5 w-5 text-brand-teal" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Podcasts We Recommend
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Learn on the go — these shows will keep you sharp on AI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {podcasts.map((podcast) => (
              <div
                key={podcast.name}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${podcast.color}`}>
                  <Headphones className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                    {podcast.name}
                  </h3>
                  <p className="text-xs font-medium text-brand-teal">{podcast.host}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    {podcast.description}
                  </p>
                </div>
                <a
                  href={podcast.listenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-brand-navy dark:hover:text-white transition-colors pt-3 border-t border-slate-100 dark:border-slate-700"
                >
                  <Headphones className="h-4 w-4" />
                  Listen on Spotify
                  <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.map(({ category, items }) => {
            const Icon = categoryIcons[category] || Newspaper
            return (
              <div key={category} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-brand-navy flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-teal" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((article) => (
                    <a
                      key={article.title}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-3 hover:shadow-md hover:border-brand-teal/40 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug group-hover:text-brand-teal transition-colors">
                          {article.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0 mt-1 group-hover:text-brand-teal transition-colors" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {article.description}
                      </p>
                      <p className="text-xs font-medium text-brand-teal mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
                        {article.source}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
