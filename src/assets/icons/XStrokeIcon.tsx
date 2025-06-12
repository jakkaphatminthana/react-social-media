import type { SVGProps } from "react";

const XStrokeIcon = ({
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
        d="M6 18L18 M6 6l12 12"
      />
    </svg>
  );
};
export default XStrokeIcon;
