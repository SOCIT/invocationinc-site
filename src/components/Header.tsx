import Link from "next/link";

export function Header() {
  return (
    <header className="lf-site-header">
      <Link href="/" aria-label="Invocation Inc home">
        <img
          src="/img/logo-header.png"
          alt="Invocation Inc"
          className="hub-logo"
        />
      </Link>
      <nav className="hub-nav">
        <Link href="#what-we-do">What we do</Link>
        <Link href="#programs">Programs</Link>
        <Link href="#start">Start here</Link>
      </nav>
    </header>
  );
}
