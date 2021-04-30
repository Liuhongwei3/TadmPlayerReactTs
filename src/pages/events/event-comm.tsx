import React from "react";
import styled from "styled-components";
import { Empty, Pagination, Spin, Tabs } from "antd";

import { Event } from "../user/type";
import req from "../../api/req";
import { IComment, IHotComment } from "../commType";
import StyledComment from "../../components/StyledComment";
import { notify } from "../../utils";
import { ESourceType } from "../../api/netease/types/like-type";
import { EMessageType } from "../enums";

const StyledCommBg = styled.div`
    margin-left: 54px;
    background-color: #5b5b5b;
    padding: 16px;
    border-radius: 5px;
`;

interface IProps {
    showComm: boolean;
    event: Event;
}

const EventComm: React.FunctionComponent<IProps> = (props: IProps) => {
    const { showComm, event } = props;
    const commCount = event.info.commentCount;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(5);
    const [hotComms, setHotComms] = React.useState<IHotComment[]>();
    const [comms, setcomms] = React.useState<IComment[]>();

    const before = React.useMemo(() => {
        return comms && comms.length && comms[pageSize - 1]
            ? comms[pageSize - 1].time
            : undefined;
    }, [comms, pageSize]);

    const getUserEventComm = React.useCallback(() => {
        setLoading(true);
        req.netease
            .userEventComm(
                event.info.threadId,
                pageSize,
                (page - 1) * pageSize,
                before
            )
            .then((res) => {
                setHotComms(res.hotComments);
                setcomms(res.comments);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户动态评论数据失败"
                )
            )
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event.info.threadId, page, pageSize]);

    React.useEffect(() => {
        commCount && getUserEventComm();
    }, [commCount, getUserEventComm, page, pageSize]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
    }, []);

    return showComm ? (
        <StyledCommBg>
            <Spin tip="Loading..." spinning={loading}>
                <Tabs defaultActiveKey="hot-comm">
                    <Tabs.TabPane tab={`精彩评论`} key="hot-comm">
                        {hotComms && hotComms.length ? (
                            hotComms.map((hotComm) => (
                                <StyledComment
                                    key={hotComm.commentId}
                                    type={ESourceType.EVENT}
                                    id={event.info.threadId}
                                    comm={hotComm}
                                />
                            ))
                        ) : (
                            <Empty />
                        )}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={`最新评论`} key="lastest-comm">
                        {comms && comms.length ? (
                            <React.Fragment>
                                {comms.map((comm) => (
                                    <StyledComment
                                        key={comm.commentId}
                                        type={ESourceType.EVENT}
                                        id={event.info.threadId}
                                        comm={comm}
                                    />
                                ))}
                                <Pagination
                                    style={{ float: "right" }}
                                    total={commCount}
                                    current={page}
                                    pageSize={pageSize}
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
                    </Tabs.TabPane>
                </Tabs>
            </Spin>
        </StyledCommBg>
    ) : null;
};

export default EventComm;
