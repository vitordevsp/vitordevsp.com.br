
import { ActiveLink } from "./components/ActiveLink"
import "./style.css"

export function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <ActiveLink href="/" text="Home" />
          <ActiveLink href="/sobre" text="Sobre" />
          <ActiveLink href="/projetos" text="Projetos" />
          <ActiveLink href="/posts" text="Posts" />
          <ActiveLink href="/videos" text="Vídeos" />
        </ul>
      </nav>
    </header>
  )
}
