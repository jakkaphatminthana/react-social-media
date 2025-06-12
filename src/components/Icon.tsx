import type { SVGProps } from "react";
import HamburgerIcon from "../assets/icons/HamburgerIcon";
import XStrokeIcon from "../assets/icons/XStrokeIcon";

const iconMap = {
  hamburger: HamburgerIcon,
  xStroke: XStrokeIcon,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) => {
  const Component = iconMap[name];
  return <Component size={size} color={color} {...props} />;
};

export default Icon;
