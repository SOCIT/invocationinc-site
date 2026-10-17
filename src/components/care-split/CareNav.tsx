import Link from "next/link";

const links = [
  { href: "/care-split", label: "The Care Split" },
  { href: "/care-split#only-child", label: "Only Child Test" },
  { href: "/care-split/interview", label: "Interview" },
  { href: "/care-split/sheet", label: "Split Sheet" },
  { href: "/care-split/meeting", label: "Meeting" },
  { href: "/care-split/worksheet", label: "Worksheet" },
];

export function CareNav() {
  return (
    <nav className="cs-nav" aria-label="The Care Split">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
