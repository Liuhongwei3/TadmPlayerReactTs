import React from "react";
import { Empty, Typography } from "antd";

interface IProps {
    briefDesc: string;
    desc: string;
}

const MvDesc: React.FunctionComponent<IProps> = (props: IProps) => {
    const { briefDesc, desc } = props;

    return (
        <React.Fragment>
            <Typography.Title style={{ color: "#e7e7e7" }} level={5}>
                MV 描述
            </Typography.Title>
            {briefDesc ? (
                <div
                    style={{
                        color: "#c0c0c0",
                        marginLeft: 32,
                        fontSize: 15,
                        lineHeight: 2,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: briefDesc.replaceAll("\n", "<br/>"),
                    }}
                ></div>
            ) : (
                <Empty />
            )}
            <Typography.Title style={{ color: "#e7e7e7" }} level={5}>
                MV 详情
            </Typography.Title>
            {desc ? (
                <div
                    style={{
                        color: "#c0c0c0",
                        marginLeft: 32,
                        fontSize: 15,
                        lineHeight: 2,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: desc.replaceAll("\n", "<br/>"),
                    }}
                ></div>
            ) : (
                <Empty />
            )}
        </React.Fragment>
    );
};

export default MvDesc;
