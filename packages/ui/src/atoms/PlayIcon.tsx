/**
 *
 * @returns: En PlayIcon-komponent ...
 * @example: <PlayIcon />
 * @alias: PlayIcon
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/

const PlayIcon = () => {
    return (
        <svg
            className="mx-auto"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_850_777)">
                <rect x="8" y="6" width="80" height="80" rx="40" fill="#FAFAFA" />
                <path
                    d="M40 35.1033V56.8937C40 58.5553 41.8866 59.5649 43.3395 58.6605L60.9911 47.7653C61.3002 47.5756 61.5547 47.3132 61.7311 47.0024C61.9075 46.6917 62 46.3427 62 45.988C62 45.6333 61.9075 45.2843 61.7311 44.9736C61.5547 44.6628 61.3002 44.4004 60.9911 44.2107L43.3395 33.3365C43.0124 33.1313 42.6343 33.0156 42.2451 33.0015C41.8558 32.9873 41.4698 33.0754 41.1279 33.2563C40.7859 33.4372 40.5006 33.7043 40.3021 34.0294C40.1036 34.3545 39.9992 34.7255 40 35.1033Z"
                    fill="#17484D"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_850_777"
                    x="0"
                    y="0"
                    width="96"
                    height="96"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.295833 0 0 0 0 0.295833 0 0 0 0 0.295833 0 0 0 0.12 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_850_777"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_850_777"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    )
};

export default PlayIcon;

