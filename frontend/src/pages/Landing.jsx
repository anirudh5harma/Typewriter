import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  PenLine, Users, Zap, Shield, ArrowRight, Sparkles,
  FileText, Globe, Clock
} from 'lucide-react';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-terracotta-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-parchment-200 border border-parchment-300 text-ink-600 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles size={14} className="text-terracotta-500" />
              Write together, beautifully
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 animate-slide-up">
              Where words come
              <span className="relative inline-block mx-2">
                <span className="relative z-10">alive</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-terracotta-200/60 -z-0 rounded-sm" />
              </span>
              together
            </h1>

            <p className="text-lg md:text-xl text-ink-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up animate-stagger-1">
              A refined collaborative editor for teams who care about craft.
              Real-time sync, elegant design, and the quiet focus you need to do your best work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-stagger-2">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5">
                  Go to Dashboard
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                    Start writing free
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editor Preview */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-parchment-300 bg-white">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-parchment-200 bg-parchment-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-terracotta-300" />
                <div className="w-3 h-3 rounded-full bg-parchment-400" />
                <div className="w-3 h-3 rounded-full bg-sage-300" />
              </div>
              <span className="text-xs text-ink-300 ml-2 font-mono">The Great Draft.md</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-ink-900">
                  The Art of Collaborative Writing
                </h2>
                <p className="text-ink-400 leading-relaxed mb-4">
                  When multiple minds converge on a single document, something magical happens.
                  Ideas build upon ideas. Sentences sharpen. Stories find their voice.
                </p>
                <p className="text-ink-400 leading-relaxed mb-4">
                  Typewriter is built for this moment. Every keystroke syncs in real-time.
                  Every cursor tells you where your teammates are thinking.
                </p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-parchment-200">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-terracotta-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">A</div>
                    <div className="w-8 h-8 rounded-full bg-sage-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">S</div>
                    <div className="w-8 h-8 rounded-full bg-ink-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">M</div>
                  </div>
                  <span className="text-sm text-ink-300">3 people editing right now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-300 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Everything you need to write</h2>
            <p className="text-ink-400 max-w-xl mx-auto">Built with care for the writing process, from first draft to final polish.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={22} className="text-terracotta-500" />,
                title: 'Real-time Collaboration',
                desc: 'See every cursor, every keystroke. Work together without the chaos of conflicting versions.',
              },
              {
                icon: <Shield size={22} className="text-sage-600" />,
                title: 'Granular Permissions',
                desc: 'Owner, editor, or viewer. Control exactly who can do what with every document.',
              },
              {
                icon: <Globe size={22} className="text-ink-400" />,
                title: 'Always in Sync',
                desc: 'Your work saves automatically. Access it from anywhere, on any device, at any time.',
              },
              {
                icon: <FileText size={22} className="text-terracotta-500" />,
                title: 'Beautiful Documents',
                desc: 'Clean, typographically refined output that looks as good as your ideas deserve.',
              },
              {
                icon: <Clock size={22} className="text-sage-600" />,
                title: 'Version History',
                desc: 'Travel back in time. Review every change and restore any previous version instantly.',
              },
              {
                icon: <Users size={22} className="text-ink-400" />,
                title: 'Team Management',
                desc: 'Invite teammates, manage roles, and organize documents across your whole team.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card p-6 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-lg bg-parchment-100 flex items-center justify-center mb-4 group-hover:bg-parchment-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-ink-900" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta-600 rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage-600 rounded-full blur-[100px] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <PenLine size={40} className="mx-auto text-terracotta-400 mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-parchment-100 mb-6">
            Ready to start writing?
          </h2>
          <p className="text-ink-300 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of writers, teams, and creators who trust Typewriter for their most important work.
          </p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary text-base px-10 py-4 bg-terracotta-500 hover:bg-terracotta-400 inline-flex">
              Open Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Link>
          ) : (
            <Link to="/register" className="btn-primary text-base px-10 py-4 bg-terracotta-500 hover:bg-terracotta-400 inline-flex">
              Create your account
              <ArrowRight size={18} className="ml-2" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
