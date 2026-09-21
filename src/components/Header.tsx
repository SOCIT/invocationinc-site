import Link from "next/link";

export function Header() {
  return (
    <header className="lf-site-header">
      <div>Invocation Inc · Human Potential Engineering</div>
      <nav className="hub-nav">
        <Link href="#what-we-do">What we do</Link>
        <Link href="#programs">Programs</Link>
        <Link href="#start">Start here</Link>
      </nav>
    </header>
  );
}
