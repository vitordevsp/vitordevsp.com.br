"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import "./style.css"

interface ActiveLinkProps {
  href?: string
  text?: string
}

export function ActiveLink({ href, text }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActiveLink = pathname === href || pathname === ""

  return (
    <li className={`header-item ${isActiveLink && "header-item--active"}`}>
      <Link href={href || "/"}>
        {text}
      </Link>
    </li>
  )
}
