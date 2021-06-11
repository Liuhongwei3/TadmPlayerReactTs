import React from "react";

interface IProps {
    onClick?: () => void;
}

const RMBSvg: React.FC<IProps> = (props: IProps) => {
    return (
        <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2011"
            width="1em"
            height="1em"
            onClick={props.onClick}
        >
            <path
                d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z"
                p-id="2012"
                fill="#dcdcdc"
            ></path>
        </svg>
    );
};

export default RMBSvg;