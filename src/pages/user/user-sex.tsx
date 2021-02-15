import React from "react";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";

interface IProps {
    gender: number;
}

const UserSex: React.FunctionComponent<IProps> = (props: IProps) => {
    const { gender } = props;

    if (gender === 1) {
        return (
            <>
                <ManOutlined style={{ color: "#1890ff" }} />
                <span>男</span>
            </>
        );
    } else if (gender === 2) {
        return (
            <>
                <WomanOutlined style={{ color: "pink" }} />
                <span>女</span>
            </>
        );
    } else {
        return <span>保密</span>;
    }
};

export default UserSex;
