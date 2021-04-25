import React from "react";

interface IProps {
    onClick?: () => void;
}
const RandomSvg: React.FC<IProps> = (props: IProps) => {
    return (
        <svg
            viewBox="0 0 1063 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3033"
            width="1em"
            height="1em"
            onClick={props.onClick}
        >
            <path
                d="M911.478154 682.653538a38.990769 38.990769 0 0 0-30.326154-13.115076c-21.897846 0.827077-38.912 19.298462-38.084923 41.196307 0.472615 11.933538 6.380308 22.055385 14.966154 28.987077l47.182769 47.222154a289.201231 289.201231 0 0 1-139.264-61.794462L331.697231 257.063385A369.388308 369.388308 0 0 0 53.956923 131.150769a39.384615 39.384615 0 1 0 0 78.769231h0.039385c83.652923 0 163.249231 36.115692 219.214769 99.879385l433.624615 468.007384 8.27077 7.483077a369.664 369.664 0 0 0 194.048 81.762462l-52.539077 51.081846 0.984615 0.945231a39.069538 39.069538 0 0 0-17.604923 33.71323c0.866462 21.897846 19.298462 38.990769 41.156923 38.124308a38.912 38.912 0 0 0 29.971692-16.699077l0.393846 0.393846 148.48-144.226461-148.046769-148.204308-0.472615 0.472615z"
                p-id="3034"
                fill="#dcdcdc"
            ></path>
            <path
                d="M911.163077 30.759385a38.990769 38.990769 0 0 0-30.011077-16.699077 39.660308 39.660308 0 0 0-41.117538 38.124307 38.990769 38.990769 0 0 0 17.604923 33.673847l-0.984616 1.024 48.600616 47.261538a366.08 366.08 0 0 0-217.481847 106.259692l-128.551384 139.34277 0.196923 0.196923a38.990769 38.990769 0 0 0-10.633846 26.505846 39.384615 39.384615 0 0 0 39.384615 39.384615 38.990769 38.990769 0 0 0 28.750769-12.878769l0.196923 0.196923 126.582154-137.294769a287.665231 287.665231 0 0 1 166.675693-82.944l-52.224 52.302769a39.108923 39.108923 0 0 0-15.044923 29.026462c-0.866462 21.897846 16.147692 40.329846 38.045538 41.196307a38.990769 38.990769 0 0 0 30.326154-13.115077l0.472615 0.433231 148.046769-148.164923-148.48-144.226462-0.393846 0.393847zM415.783385 554.889846a38.872615 38.872615 0 0 0-28.672 12.760616l-0.196923-0.157539-133.750154 144.265846A289.201231 289.201231 0 0 1 53.956923 790.843077v0.472615c-0.866462-0.039385-1.575385-0.472615-2.441846-0.472615a39.384615 39.384615 0 1 0 0 78.769231c0.866462 0 1.575385-0.472615 2.441846-0.472616v0.472616c94.562462 0 184.516923-35.721846 255.094154-102.4l135.601231-146.156308-0.196923-0.157538a38.872615 38.872615 0 0 0 10.712615-26.624 39.384615 39.384615 0 0 0-39.384615-39.384616"
                p-id="3035"
                fill="#dcdcdc"
            ></path>
        </svg>
    );
};

export default RandomSvg;
