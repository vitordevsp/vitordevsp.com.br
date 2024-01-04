import { Icon, IconName, Span } from ".."
import "./style.scss"

interface LinkWithIconProps {
  href?: string
  icon?: IconName
  text?: string
}

export function LinkWithIcon({ href, icon, text }: LinkWithIconProps) {
  return (
    <a
      className="link-with-icon"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="link-with-icon__content">
        {icon && (
          <Icon
            name={icon}
            color="var(--text-color-gray)"
          />
        )}

        {text && (
          <Span>
            {text}
          </Span>
        )}
      </div>
    </a>
  )
}
