
import { ActiveLink } from "./components/ActiveLink"
import "./style.scss"

export function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="header__list">
          <ActiveLink href="/" text="Home" />
          <ActiveLink href="/projetos" text="Projetos" />
          <ActiveLink href="/posts" text="Posts" />
          <ActiveLink href="/videos" text="Vídeos" />
          <ActiveLink href="/sobre" text="Sobre" />
        </ul>
      </nav>
    </header>
  )
}
