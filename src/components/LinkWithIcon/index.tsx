import { Icon, IconName } from ".."
import "./style.css"

interface LinkWithIconProps {
  href?: string
  icon?: IconName
}

export function LinkWithIcon({ href, icon }: LinkWithIconProps) {
  return (
    <a
      className="link-with-icon"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && <Icon name={icon} color="var(--text-color-gray)" />}
    </a>
  )
}
