import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Pagination, Spin, Image } from "antd";

import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { notify } from "../../utils";
import { IFollowRes } from "./type";
import reqs from "../../api/req";
import StyledCount from "../../components/detail/StyledCount";
import UserSex from "./user-sex";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType } from "../enums";

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
                    EMessageType.ERROR,
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
                                            width: DEFAULT_IMG_WIDTH,
                                            height: DEFAULT_IMG_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={100}
                                            placeholder={<LoadingImg />}
                                        >
                                            <Image
                                                alt="detail-cover"
                                                loading="lazy"
                                                style={{ opacity: 0.8 }}
                                                preview={false}
                                                width={DEFAULT_IMG_WIDTH}
                                                height={DEFAULT_IMG_HEIGHT}
                                                src={item.avatarUrl}
                                                placeholder={<LoadingImg />}
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
