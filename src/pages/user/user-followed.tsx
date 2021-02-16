import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Pagination, Spin } from "antd";

import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { notify, toTop, updateCurMenu } from "../../utils";
import { IFollowedRes } from "./type";
import reqs from "../../api/req";
import StyledCount from "../../components/detail/StyledCount";
import UserSex from "./user-sex";
import { DEFAULT_IMG_HEIGHT, DEFAULT_IMG_WIDTH } from "../../defaultConfig";

interface IProps {
    userId: number;
    followedCount: number;
}

const UserFollowed: React.FunctionComponent<IProps> = (props: IProps) => {
    const { userId, followedCount } = props;
    const history = useHistory();
    // const [page, setPage] = React.useState<number>(1);
    // const [pageSize, setPageSize] = React.useState<number>(24);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userFolloweds, setUserFolloweds] = React.useState<IFollowedRes>();

    // const lasttime = React.useMemo(() => {
    //     return userFolloweds &&
    //         userFolloweds.followeds.length &&
    //         userFolloweds.followeds[pageSize - 1]
    //         ? userFolloweds.followeds[pageSize - 1].time
    //         : undefined;
    // }, [pageSize, userFolloweds]);

    const getUserFolloweds = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .userFollowed(userId)
            .then((res) => {
                setUserFolloweds(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户粉丝列表数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [userId]);

    React.useEffect(() => {
        followedCount && getUserFolloweds();
    }, [followedCount, getUserFolloweds]);

    // const pageChange = React.useCallback((page1, pageSize1) => {
    //     setPage(page1);
    //     setPageSize(pageSize1);
    //     toTop();
    // }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/user/${id}`);
            updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {userFolloweds && userFolloweds?.followeds.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {userFolloweds?.followeds.map((item) => {
                            return (
                                <StyledItem
                                    key={item.userId}
                                    onClick={() => toDetail(item.userId)}
                                >
                                    <div
                                        style={{
                                            width: DEFAULT_IMG_WIDTH,
                                            height: DEFAULT_IMG_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={100}
                                            placeholder={<LoadingImg />}
                                        >
                                            <img
                                                style={{ opacity: 0.65 }}
                                                width={DEFAULT_IMG_WIDTH}
                                                height={DEFAULT_IMG_HEIGHT}
                                                alt="detail-cover"
                                                src={item.avatarUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <UserSex gender={item.gender} />
                                        </StyledCount>
                                    </div>

                                    <StyledName width={DEFAULT_IMG_WIDTH}>
                                        {item.nickname}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    {/* <Pagination
                        style={{ float: "right" }}
                        current={page}
                        pageSize={pageSize}
                        total={followedCount}
                        showQuickJumper={true}
                        showTotal={(total) => `共 ${total} 条`}
                        onChange={(page, pageSize) =>
                            pageChange(page, pageSize)
                        }
                    /> */}
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default UserFollowed;
