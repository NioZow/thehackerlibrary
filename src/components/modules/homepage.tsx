import {
  Search,
  BookOpen,
  Bell,
  TrendingUp,
  Shield,
  ArrowRight,
  Tag,
  Zap,
  Bold,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find cybersecurity posts instantly with powerful tag-based filtering",
    link: "/search",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description:
      "Learn specific attack techniques through curated sequences of actual researcher publications",
    link: "/path",
  },
  {
    icon: Bell,
    title: "Stay Updated",
    description:
      "Get instant notifications when researchers publish new techniques in your areas of interest",
    link: "#notifications",
  },
];

interface IProps {
  posts: number;
  topics: number;
  paths: number;
}

export default function Homepage({ posts, topics, paths }: IProps) {
  const stats = [
    { label: "Posts", value: `${posts}` },
    { label: "Security Topics", value: `${topics}` },
    { label: "Learning Paths", value: `${paths}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center space-y-8">
            <div className="space-y-6">
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                The Hacker Library
              </h1>

              <p className="text-2xl md:text-3xl font-semibold text-white">
                Skip the Course. Read the Source.
              </p>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Hacking techniques aren't first published in courses - they're
                shared in posts by security researchers. Easily access
                cutting-edge knowledge directly from the source.
              </p>
            </div>

             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="/search"
                className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Browse Research</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/path"
                className="px-8 py-3 border border-gray-700 rounded-lg font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
              >
                View Paths
              </a>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.link}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-cyan-400 text-sm font-semibold pt-2">
                    <span className="group-hover:mr-2 transition-all">
                      Learn more
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            How It Works
          </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-cyan-500/30">
                <Tag className="w-8 h-8 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white">Browse Topics</h4>
              <p className="text-sm text-gray-400">
                Explore posts tagged by security domains and techniques
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500/30">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white">Choose Your Path</h4>
              <p className="text-sm text-gray-400">
                Follow structured learning paths for deep expertise
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-purple-500/30">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white">Track Latest</h4>
              <p className="text-sm text-gray-400">
                Always access the most recent content in your field
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-pink-500/30">
                <Bell className="w-8 h-8 text-pink-400" />
              </div>
              <h4 className="font-semibold text-white">Get Notified</h4>
              <p className="text-sm text-gray-400">
                Receive alerts when new relevant posts are published
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
