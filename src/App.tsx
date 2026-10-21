import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Cloud,
  Database,
  GitBranch,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const services = [
  { icon: GitBranch, number: '01', title: 'Business process review', text: 'Understand how work really happens, then shape a practical transformation roadmap around your goals.' },
  { icon: Network, number: '02', title: 'Systems integration', text: 'Connect the tools, data and teams that keep projects moving, creating a clearer view across your business.' },
  { icon: Workflow, number: '03', title: 'Workflow automation', text: 'Remove repetitive handovers and manual admin so your people can focus on the work that needs them.' },
  { icon: BarChart3, number: '04', title: 'AI and business intelligence', text: 'Turn operational data into useful insight with approachable, practical applications of AI.' },
  { icon: Cloud, number: '05', title: 'Cloud and IT advisory', text: 'Make confident technology decisions with advice grounded in your operating model and priorities.' },
  { icon: Sparkles, number: '06', title: 'Custom digital tools', text: 'Build focused software and digital tools for the important gaps off-the-shelf products cannot fill.' },
];

const interestOptions = ['Business process review', 'Systems integration', 'Workflow automation', 'AI and business intelligence', 'Cloud and IT advisory', 'Custom digital tools'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    const form = new FormData(event.currentTarget);
    const enquiry = {
      name: String(form.get('name') ?? '').trim(),
      company: String(form.get('company') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      area_of_interest: String(form.get('interest') ?? '').trim(),
      message: String(form.get('message') ?? '').trim(),
    };

    const { error } = await supabase.from('contact_enquiries').insert(enquiry);
    if (error) {
      setFormError('We could not send your enquiry just now. Please try again, or use the email placeholder below.');
      return;
    }

    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Excortex home">
            <span className="brand-mark"><Network size={25} strokeWidth={1.8} /></span>
            <span>EXCORTEX</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
            {['about', 'services', 'industries', 'approach'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item === 'approach' ? 'How we work' : item}</button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo('contact')}>Discuss a project <ArrowRight size={16} /></button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid" />
          <div className="container hero-content">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> People + processes + technology</p>
              <h1>Engineering better <em>ways to work.</em></h1>
              <p className="hero-lede">We connect people, processes and systems to help engineering businesses operate smarter and deliver more value.</p>
              <div className="button-row">
                <button className="button button-gold" onClick={() => scrollTo('contact')}>Discuss a project <ArrowRight size={18} /></button>
                <button className="button button-outline" onClick={() => scrollTo('services')}>Explore our services <ArrowRight size={18} /></button>
              </div>
              <div className="hero-note"><ShieldCheck size={17} /> Practical advice. Connected thinking. Useful outcomes.</div>
            </div>
            <div className="hero-visual" aria-label="Illustration of a connected infrastructure project">
              <div className="visual-glow" />
              <img className="hero-image" src="/African_LandingPage_Graphic.png" alt="Cable-stayed bridge with connected project data lines at sunset" />
              <div className="data-card">
                <div className="data-card-title"><span>Project overview</span><span className="dots">•••</span></div>
                <div className="metric-row"><div><small>Projects</small><strong>12</strong></div><div><small>On track</small><strong>75%</strong></div><div><small>Value</small><strong>£4.8m</strong></div></div>
                <small className="progress-label">Project progress</small>
                {['Design', 'Planning', 'Construction', 'Handover'].map((label, index) => <div className="progress" key={label}><span>{label}</span><i><b style={{ width: `${[90, 68, 48, 25][index]}%` }} /></i></div>)}
              </div>
              <div className="node node-cloud"><Cloud size={22} /></div><div className="node node-data"><Database size={22} /></div><div className="node node-people"><Network size={22} /></div>
            </div>
          </div>
        </section>

        <section className="promise-strip"><div className="container promise-grid"><div><Network size={23} /><span><strong>Connected systems</strong><small>Unify your tools, data and people.</small></span></div><div><Workflow size={23} /><span><strong>Automated workflows</strong><small>Reduce manual work and increase efficiency.</small></span></div><div><BarChart3 size={23} /><span><strong>Clearer project insight</strong><small>Make faster, smarter decisions.</small></span></div></div></section>

        <section id="about" className="section about-section"><div className="container about-grid"><div className="section-intro"><p className="eyebrow">A partner for progress</p><h2>Technology should make work <em>feel simpler.</em></h2></div><div className="about-copy"><p className="lead">Excortex helps organisations make technology useful, connected and aligned with the way their people work.</p><p>We bring together an understanding of business processes, engineering work and digital systems to solve the operational problems that get in the way of great delivery.</p><p>Our focus is civil and structural engineering consultancies and infrastructure businesses, while our approach is relevant to any organisation ready to work in a more connected way.</p><button className="text-link" onClick={() => scrollTo('approach')}>See how we work <ArrowRight size={17} /></button></div></div></section>

        <section id="services" className="section services-section"><div className="container"><div className="center-intro"><p className="eyebrow">Our services</p><h2>Built around the way <em>your teams work.</em></h2><p>Practical, integrated solutions that help you run projects, people and knowledge more effectively.</p></div><div className="service-grid">{services.map(({ icon: Icon, number, title, text }) => <article className="service-card" key={title}><div className="service-top"><span className="service-icon"><Icon size={23} /></span><span className="service-number">{number}</span></div><h3>{title}</h3><p>{text}</p><button className="text-link" onClick={() => scrollTo('contact')}>Find out more <ArrowRight size={16} /></button></article>)}</div></div></section>

        <section id="industries" className="section industries-section"><div className="container industries-grid"><div className="industry-statement"><p className="eyebrow">Where we add value</p><h2>Technology with an understanding of <em>engineering.</em></h2><p>Engineering consultancies manage complex information, shifting priorities and high-value client relationships. The right digital foundations can make all three easier to handle.</p><button className="button button-gold" onClick={() => scrollTo('contact')}>Talk through a challenge <ArrowRight size={18} /></button></div><div className="use-case-list"><p className="list-label">Civil + structural engineering consultancies</p>{['Managing project information in one connected view', 'Automating approvals, handovers and reporting', 'Connecting design tools with business systems', 'Organising BOQs, cost data and commercial insight', 'Improving the client experience from brief to handover'].map((item) => <div className="use-case" key={item}><span><Check size={15} /></span><p>{item}</p></div>)}<div className="other-sectors"><Lightbulb size={19} /><div><strong>Other sectors</strong><p>The same practical thinking can support other project-led and information-rich businesses.</p></div></div></div></div></section>

        <section id="approach" className="section approach-section"><div className="container"><div className="center-intro"><p className="eyebrow">How we work</p><h2>Clear steps. <em>Shared momentum.</em></h2><p>We keep the path from challenge to change focused, transparent and grounded in what will work for your team.</p></div><div className="steps">{[['01', 'Understand the challenge', 'We listen carefully, map the current picture and identify where change will make the biggest difference.'], ['02', 'Design the solution', 'We turn insight into a clear, proportionate plan that fits your people, priorities and existing systems.'], ['03', 'Implement and integrate', 'We make the change real, connecting the technical pieces and supporting your team through adoption.'], ['04', 'Support and improve', 'We stay close to the work, helping you refine, measure and build on what is now possible.']].map(([number, title, text], index) => <div className="step" key={number}><span className="step-number">{number}</span><div className="step-line"><i className={index === 3 ? 'last' : ''} /></div><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

        <section id="contact" className="contact-section"><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">Start a conversation</p><h2>Make your next move <em>more connected.</em></h2><p>Tell us a little about the challenge you are trying to solve. We will arrange an initial discussion and explore whether we can help.</p><div className="contact-details"><div><Mail size={18} /><span>hello@excortex.example<small>Contact email placeholder</small></span></div><div><Phone size={18} /><span>+44 (0) 0000 000000<small>Phone number placeholder</small></span></div><div><MapPin size={18} /><span>Location to be confirmed<small>Company location placeholder</small></span></div></div></div><div className="form-card">{submitted ? <div className="success-state"><span><Check size={25} /></span><h3>Thank you for getting in touch.</h3><p>Your enquiry has been received. We will be in contact using the details you provided.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={16} /></button></div> : <form onSubmit={handleSubmit}><div className="form-heading"><h3>Discuss a project</h3><p>All fields are required.</p></div><div className="field-grid"><label>Name<input name="name" required minLength={2} placeholder="Your name" /></label><label>Company<input name="company" required minLength={2} placeholder="Company name" /></label></div><label>Email address<input type="email" name="email" required placeholder="you@company.com" /></label><label>Area of interest<select name="interest" required defaultValue=""><option value="" disabled>Select an area</option>{interestOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="select-icon" size={17} /></label><label>How can we help?<textarea name="message" required minLength={10} rows={4} placeholder="Tell us a little about what you would like to improve..." /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button type="submit" className="button button-gold form-submit">Send enquiry <ArrowRight size={18} /></button></form>}</div></div></section>
      </main>
      <footer><div className="container footer-wrap"><div className="brand"><span className="brand-mark"><Network size={22} strokeWidth={1.8} /></span><span>EXCORTEX</span></div><p>Engineering better ways to work.</p><span className="footer-note">© {new Date().getFullYear()} Excortex · Company details to be confirmed</span></div></footer>
    </div>
  );
}

export default App;
