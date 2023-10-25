import { FC } from 'react';

interface SvgIconProps {
  color: string;
}

export const CheckIcon: FC<SvgIconProps> = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 7L10.25 17L5 12.4545"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
