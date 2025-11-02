import type { SVGProps } from "react";

export function CodeexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--secondary))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#grad1)" opacity="0.4" />
      <path d="M2 17l10 5 10-5" stroke="url(#grad1)" />
      <path d="M2 12l10 5 10-5" stroke="url(#grad1)" />
      <path d="M12 22V12" stroke="url(#grad1)" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 6.097-4.464 10.99-9.99 10.99-5.524 0-10-4.893-10-10.99 0-6.097 4.476-10.99 10-10.99 2.76 0 5.253 1.02 7.15 2.675L18.6 2.675C16.48 1.01 13.433 0 10 0 4.477 0 0 4.477 0 10s4.477 10 10 10c5.19 0 9.45-3.947 9.95-8.995h-9.95v-2.007h15.545z" transform="translate(2 2)" fill="currentColor"/>
      </svg>
    );
}

export function WandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13 2L3 12l4 4 1-1 4-4 9-9-4-4z" />
      <path d="M5 19l-2 2" />
      <path d="M19 5l2-2" />
      <path d="M8 16l-3 3" />
      <path d="M15 9l-4 4" />
      <path d="M16 8l3-3" />
    </svg>
  )
}