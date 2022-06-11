import Link from "next/link";
import {useRouter} from 'next/router'

export default function Navlink({href, children}) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`nav-link ${router.pathname === href ? 'active' : null}`} aria-current="page">
        {children}
      </a>
    </Link>
  );
}
