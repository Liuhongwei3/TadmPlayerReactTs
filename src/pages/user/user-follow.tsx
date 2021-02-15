import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Pagination, Spin } from "antd";

import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { notify, updateCurMenu } from "../../utils";
import { IFollowRes } from "./type";
import reqs from "../../api/req";
import StyledCount from "../../components/detail/StyledCount";
import UserSex from "./user-sex";

interface IProps {
    userId: number;
    followCount: number;
}

const UserFollow: React.FunctionComponent<IProps> = (props: IProps) => {
    const { userId, followCount } = props;
    const history = useHistory();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(24);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userFollows, setUserFollows] = React.useState<IFollowRes>();

    const getUserFollows = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .userFollow(userId, pageSize, (page - 1) * pageSize)
            .then((res) => {
                setUserFollows(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户关注列表数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [page, pageSize, userId]);

    React.useEffect(() => {
        getUserFollows();
    }, [getUserFollows]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/user/${id}`);
            updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {userFollows && userFollows?.follow.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {userFollows?.follow.map((item) => {
                            return (
                                <StyledItem
                                    key={item.userId}
                                    onClick={() => toDetail(item.userId)}
                                >
                                    <div
                                        style={{
                                            width: 150,
                                            height: 150,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={100}
                                            placeholder={<LoadingImg />}
                                        >
                                            <img
                                                style={{ opacity: 0.65 }}
                                                width={150}
                                                height={150}
                                                alt="detail-cover"
                                                src={item.avatarUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <UserSex gender={item.gender} />
                                        </StyledCount>
                                    </div>

                                    <StyledName width={150}>
                                        {item.nickname}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Pagination
                        style={{ float: "right" }}
                        current={page}
                        pageSize={pageSize}
                        total={followCount}
                        showQuickJumper={true}
                        showTotal={(total) => `共 ${total} 条`}
                        onChange={(page, pageSize) =>
                            pageChange(page, pageSize)
                        }
                    />
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default UserFollow;
