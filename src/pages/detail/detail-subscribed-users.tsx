import React from "react";
import { Empty, Pagination, Spin } from "antd";
import LazyLoad from "react-lazyload";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { dateFormat, notify, updateCurMenu } from "../../utils";
import { useHistory } from "react-router-dom";
import { ISubscriber } from "./type";
import reqs from "../../api/req";
import StyledCount from "../../components/detail/StyledCount";
import UserSex from "../user/user-sex";
import { DEFAULT_IMG_HEIGHT, DEFAULT_IMG_WIDTH } from "../../defaultConfig";

interface IProps {
    detailId: number;
    subUserCount: number;
}

const DetailSubscribedUsers: React.FunctionComponent<IProps> = (
    props: IProps
) => {
    const { detailId, subUserCount } = props;
    const history = useHistory();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(24);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [subsUsers, setSubsUsers] = React.useState<ISubscriber[]>([]);

    const getSubUsers = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .detailSubscribe(detailId, pageSize, (page - 1) * pageSize)
            .then((res) => {
                setSubsUsers(res.subscribers);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌单收藏者数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [detailId, page, pageSize]);

    React.useEffect(() => {
        getSubUsers();
    }, [getSubUsers, page, pageSize]);

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
            {subsUsers.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {subsUsers.map((item: ISubscriber) => {
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
                                            height={DEFAULT_IMG_HEIGHT}
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
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            {`${dateFormat(
                                                item.subscribeTime,
                                                "more"
                                            )} 收藏`}
                                        </StyledDesc>
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
                        total={subUserCount}
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

export default DetailSubscribedUsers;
