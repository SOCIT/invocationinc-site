const products = [
  {
    name: "Eight Weeks to Happy",
    line: "An 8-week system for taking control of your happiness.",
    price: "$47",
    was: null as string | null,
    note: null as string | null,
    img: "/img/card-ew2h.jpg",
    alt: "A path through a misty forest",
    url: "https://invocationinc-ew2h.vercel.app/",
  },
  {
    name: "How to Train Your Partner",
    line: "Communication science for better romantic relationships.",
    price: "$9.97",
    was: "$19.97",
    note: null,
    img: "/img/card-h2typ.jpg",
    alt: "A red rose in the dark",
    url: "https://invocationinc-h2typ.vercel.app/",
  },
  {
    name: "How to Create Time",
    line: "An 8-week system: same 24 hours, different output.",
    price: "$47",
    was: "$97",
    note: "Before-proof price",
    img: "/img/card-h2ct.jpg",
    alt: "A small island seen from above",
    url: "https://invocationinc-h2ct.vercel.app/",
  },
  {
    name: "How to Like People",
    line: "A field manual for social fluency: SmileBell™, CLIFFORD, the 4% Rule.",
    price: "$19.97",
    was: "$39.97",
    note: null,
    img: "/img/card-h2lp.jpg",
    alt: "A DJ playing to a crowd",
    url: "https://invocationinc-h2lp.vercel.app/",
  },
];

export function HubPage() {
  return (
    <>
      <section className="hub-hero">
        <div className="hub-hero-inner">
          <p className="lf-stamp hub-hero-stamp">
            Invocation Inc · Human Potential Engineering
          </p>
          <h1>Change doesn&rsquo;t take years. It takes a moment.</h1>
          <p className="hub-lead">
            Invocation was founded on the principle of rapid personal change.
            Humans can have their lives and perceptions changed in a single
            moment, in response to all sorts of external stimuli. By studying
            these &ldquo;Change Events&rdquo; &mdash; and thousands of studies
            spanning cultures around the world over centuries &mdash; we found
            that these instantaneous changes can happen intentionally.
          </p>
          <p className="hub-sub">
            We&rsquo;re Human Performance Engineers. We build systems that
            invoke a better you &mdash; and we sell them direct.
          </p>
          <div className="hub-cta-row">
            <a href="#programs" className="lf-btn lf-btn-red hub-btn">
              See the four programs
            </a>
            <a href="#what-we-do" className="lf-btn lf-btn-ghost hub-btn">
              What we do
            </a>
          </div>
        </div>
      </section>

      <main className="lf-wrap">
        <section id="what-we-do">
          <h2>What we do</h2>
          <p>
            Invocation is a group of Human Performance Engineers (HPEs) who
            awaken the power, confidence, and knowledge inside of you so you
            can better yourself.
          </p>
          <p>
            Most of the industry sells you the long road: years of therapy,
            endless coaching calls, motivation that evaporates by Monday.
            Coaches coach, teachers teach, trainers train, speakers speak. We
            do change work.
          </p>
          <p>
            Here&rsquo;s the part nobody tells you: you don&rsquo;t have to
            want to change in order to change. Your subconscious gives
            absolutely zero fucks about what you want or believe &mdash; if
            it did, nobody would develop a phobia from one bad afternoon or
            be changed forever by a single event. Change is a mechanism. We
            just aim it.
          </p>
          <h3>For teams and individuals</h3>
          <p>
            We primarily focus on corporate and team management &mdash; from
            entrepreneurs to Fortune 500 companies. We also have programs for
            everyone wanting to invoke their better self.
          </p>
          <p>
            Our communications programs empower you and your team to
            communicate effectively inside and outside of your organization.
            Private clients learn to improve their mental and physical health
            through communication. Salespeople increase customer relationships
            through a better framework requiring lower effort.
          </p>
          <p>
            Your physical health &mdash; and the physical health of your
            employees &mdash; directly affects productivity, longevity,
            attendance, and happiness. Our systems start with the basics of
            health management, the 80%, and move toward advanced performance
            enhancement, down to the 1%.
          </p>
          <div className="hub-band">
            <figure>
              <img src="/img/wwd-brain.jpg" alt="A model of the human brain" />
              <figcaption>Change Events</figcaption>
            </figure>
            <figure>
              <img src="/img/wwd-desk.jpg" alt="A desk late at night" />
              <figcaption>Corporate &amp; teams</figcaption>
            </figure>
            <figure>
              <img src="/img/wwd-tire.jpg" alt="Training through a tire" />
              <figcaption>Physical performance</figcaption>
            </figure>
            <figure>
              <img src="/img/wwd-forest.jpg" alt="A path through tall trees" />
              <figcaption>The road out</figcaption>
            </figure>
          </div>
        </section>

        <section id="programs">
          <h2>Four programs. Pick your bottleneck.</h2>
          <p>
            Each one is a complete system, built from the same science, sold
            direct from the author. No fluff, no filler, no ten-hour video
            course you&rsquo;ll never finish. Buy it, read it, use it.
          </p>
          <div className="hub-grid">
            {products.map((p) => (
              <article key={p.name} className="hub-card">
                <img src={p.img} alt={p.alt} className="hub-card-img" />
                <h3>{p.name}</h3>
                <p className="hub-card-line">{p.line}</p>
                <p className="lf-price-row hub-card-price">
                  {p.was && <span className="lf-was">{p.was}</span>}
                  <span className="lf-now">{p.price}</span>
                  {p.note && <span className="hub-card-note">{p.note}</span>}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lf-btn lf-btn-red"
                >
                  Get {p.name}
                </a>
              </article>
            ))}
          </div>
          <p className="lf-center hub-fine">
            Every program is delivered instantly as a PDF ebook. No middleman,
            no subscription, no upsell maze.
          </p>
        </section>

        <section id="founder" className="hub-founder">
          <img src="/img/founder.jpg" alt="Jonah Dorman" />
          <div>
            <h2>Built by an operator</h2>
            <p>
              Invocation was founded by Jonah Dorman, a Human Performance
              Engineer who spent decades learning to talk to people and
              teaching people how to communicate with each other. He still
              runs a company making weapons components for the U.S. Navy
              &mdash; and a few other companies besides.
            </p>
          </div>
        </section>

        <section id="start">
          <h2>Start here</h2>
          <p>
            One of these four is the bottleneck in your life right now. Your
            happiness, your relationship, your time, or your ability to walk
            into a room and belong there. Pick the one that&rsquo;s costing
            you the most. Fix it. Then come back for the next one.
          </p>
          <p>
            <strong>
              You don&rsquo;t have to want to change in order to change. You
              just have to start.
            </strong>
          </p>
          <div className="hub-cta-row">
            <a href="#programs" className="lf-btn lf-btn-red hub-btn">
              Browse the programs
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
