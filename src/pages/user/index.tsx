import React from "react";
import { Button, Spin } from "antd";

import req from "../../api/req";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { toTop } from "../../utils";

interface IUserInfo {
    userId: number;
    userName: string;
}

const User: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userInfo, setUserInfo] = React.useState<IUserInfo>({
        userId: 537069044,
        userName: "tadm",
    });

    const getUserInfo = React.useCallback(async () => {
        setLoading(true);
        const data = await req.netease.userDetail(userInfo.userId);
        console.log(data);
        setLoading(false);
    }, [userInfo.userId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);
    
    return (
        <Spin tip="Loading..." spinning={loading}>
            <StyledWrapper>hello user {userInfo.userName}</StyledWrapper>
            <Button type="primary">click</Button>
        </Spin>
    );
};

export default User;
