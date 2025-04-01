import {
  FiGithub,
  FiYoutube,
  FiLinkedin,
  FiInstagram,
  FiCalendar,
  FiExternalLink,
  FiFigma,
} from "react-icons/fi"
import { IconBaseProps, IconType } from "react-icons"

export type IconName = "github" | "youtube" | "linkedin" | "instagram" | "figma" | "calendar" | "link"

export interface IconProps extends IconBaseProps {
  name: IconName
}

const iconObj: Record<IconName, IconType> = {
  github: FiGithub,
  youtube: FiYoutube,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  calendar: FiCalendar,
  link: FiExternalLink,
  figma: FiFigma,
}

export function Icon({ name, ...rest }: IconProps) {
  const IconToRender = iconObj[name]

  return (
    <IconToRender {...rest} />
  )
}
