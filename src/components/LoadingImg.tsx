import React from "react";
import styled from "styled-components";
import { DEFAULT_LOADING_IMG } from "../web-config/defaultConfig";

interface IProps {
    src?: string;
}

const LoadingImg: React.FC = () => {
    return (
        <img
            style={{ backgroundColor: "transparent", opacity: 0.7 }}
            width="100%"
            height="100%"
            alt="loading-cover"
            src={DEFAULT_LOADING_IMG}
        />
    );
};
// const LoadingImg: React.FC<IProps> = (props: IProps) => {
//     const { src } = props;
//     const [loaded, setLoaded] = React.useState<boolean>(false);

//     React.useEffect(() => {
//         let img = new Image();

//         img.src = src || DEFAULT_LOADING_IMG;
//         img.onload = () => {
//             setLoaded(true);
//             console.log("load img success");
//         };

//         return () => {};
//     }, [src]);

//     return !loaded ? (
//         <StyledLoader />
//     ) : (
//         <img
//             style={{ backgroundColor: "transparent" }}
//             width="100%"
//             height="100%"
//             alt="loading-cover"
//             src={src}
//         />
//     );
// };

export default LoadingImg;

const StyledLoader = styled.div`
    width: 40px;
    height: 200px;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: 50%;
    margin-top: -20px;

    &:before,
    &:after {
        content: "";
        height: 40px;
        width: 40px;
        border: 8px solid rgb(106 236 155);
        border-radius: 10px;
        position: absolute;
        top: 0;
    }

    &:before {
        animation: animate 3s infinite linear;
    }

    &:after {
        animation: animate2 3s infinite linear;
    }

    @keyframes animate {
        100% {
            transform: rotate(180deg) skew(360deg);
        }
    }

    @keyframes animate2 {
        100% {
            transform: rotate(-180deg) skew(-360deg);
        }
    }
`;
