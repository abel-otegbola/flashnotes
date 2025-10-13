import { type SVGProps } from "react";

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g filter="url(#filter0_d_227_778)">
            <rect x="10" y="6.5" width="32" height="32" rx="10" fill="#7159FD"/>
            <rect x="11" y="7.5" width="30" height="30" rx="9" stroke="#FBFBFB" strokeWidth="2"/>
        </g>
        <path d="M28.3942 14.5H24.7648C24.675 14.5 24.5962 14.5598 24.5721 14.6463L24.3226 15.5408L22.0765 23.0899C22.0383 23.2181 22.1344 23.3469 22.2682 23.3469H24.7601C24.8996 23.3469 24.9963 23.4863 24.9474 23.617L22.4398 30.3236C22.3602 30.5368 22.6415 30.6963 22.7835 30.5184L30.7408 20.5493C30.8453 20.4183 30.7521 20.2245 30.5845 20.2245H26.9284C26.7902 20.2245 26.6937 20.0878 26.7399 19.9576L28.5827 14.7669C28.6289 14.6367 28.5323 14.5 28.3942 14.5Z" fill="#FBFBFB"/>
        <defs>
            <filter id="filter0_d_227_778" x="0" y="0.5" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_227_778"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_227_778" result="shape"/>
            </filter>
        </defs>
    </svg>
)
    
export default LogoIcon;