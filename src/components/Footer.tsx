import Link from "next/link";

const products = [
  { name: "Eight Weeks to Happy", url: "https://invocationinc-ew2h.vercel.app/" },
  { name: "How to Train Your Partner", url: "https://invocationinc-h2typ.vercel.app/" },
  { name: "How to Create Time", url: "https://invocationinc-h2ct.vercel.app/" },
  { name: "How to Like People", url: "https://invocationinc-h2lp.vercel.app/" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="lf-footer">
      <p>© {year} Invocation Inc. Not therapy. Not medical advice.</p>
      <p className="hub-footer-products">
        {products.map((p, i) => (
          <span key={p.name}>
            {i > 0 && " · "}
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              {p.name}
            </a>
          </span>
        ))}
      </p>
      <p>
        <Link href="/privacy">Privacy</Link>
        {" · "}
        <Link href="/terms">Terms</Link>
        {" · "}
        <Link href="/billing">Manage billing</Link>
        {" · "}
        <Link href="/private-work">Private work</Link>
      </p>
    </footer>
  );
}
