import {
  FiGithub,
  FiYoutube,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi"
import { IconBaseProps, IconType } from "react-icons"

export type IconName = "github" | "youtube" | "linkedin" | "instagram"

export interface IconProps extends IconBaseProps {
  name: IconName
}

const iconObj: Record<IconName, IconType> = {
  github: FiGithub,
  youtube: FiYoutube,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
}

export function Icon({ name, ...rest }: IconProps) {
  const IconToRender = iconObj[name]

  return (
    <IconToRender {...rest} />
  )
}
