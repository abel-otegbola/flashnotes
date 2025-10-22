import { type SVGProps } from "react";

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="#7159FD" stroke="#FBFBFB" strokeWidth="2"/>
        <path d="M18.3942 8H14.7648C14.675 8 14.5962 8.0598 14.5721 8.14626L14.3226 9.04082L12.0765 16.5899C12.0383 16.7181 12.1344 16.8469 12.2682 16.8469H14.7601C14.8996 16.8469 14.9963 16.9863 14.9474 17.117L12.4398 23.8236C12.3602 24.0368 12.6415 24.1963 12.7835 24.0184L20.7408 14.0493C20.8453 13.9183 20.7521 13.7245 20.5845 13.7245H16.9284C16.7902 13.7245 16.6937 13.5878 16.7399 13.4576L18.5827 8.26691C18.6289 8.13672 18.5323 8 18.3942 8Z" fill="#FBFBFB"/>
    </svg>
)
    
export default LogoIcon;