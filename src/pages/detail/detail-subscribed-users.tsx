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

interface IProps {
    detailId: string;
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
            .catch((e) => notify("error", e))
            .finally(() => setLoading(false));
    }, [detailId, page, pageSize]);

    React.useEffect(() => {
        getSubUsers();
    }, [getSubUsers, page, pageSize]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
    }, []);

    const toDetail = React.useCallback((id: number) => {
        // history.push(`/user/${id}`);
        updateCurMenu();
        console.log(id);
    }, []);

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
                                        {/* <StyledCount>
                                        {countFormat(item.)}
                                    </StyledCount> */}
                                        <StyledDesc width={150}>
                                            {`${dateFormat(
                                                item.subscribeTime,
                                                "more"
                                            )} 收藏`}
                                        </StyledDesc>
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
