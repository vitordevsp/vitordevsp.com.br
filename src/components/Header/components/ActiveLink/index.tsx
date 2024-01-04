"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import "./style.scss"

interface ActiveLinkProps {
  href?: string
  text?: string
}

export function ActiveLink({ href, text }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActiveLink = pathname === href || pathname === ""

  return (
    <li className={`active-link ${isActiveLink && "active-link--active"}`}>
      <Link href={href || "/"}>
        {text}
      </Link>
    </li>
  )
}
