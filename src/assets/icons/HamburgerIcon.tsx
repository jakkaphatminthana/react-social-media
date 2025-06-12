import type { SVGProps } from "react";

const HamburgerIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h6M4 12h16M4 18h16"
      />
    </svg>
  );
};
export default HamburgerIcon;
