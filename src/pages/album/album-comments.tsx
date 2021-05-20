import React from "react";
import { Empty, Spin, Tabs, Pagination } from "antd";
import req from "../../api/req";
import { notify, toTop } from "../../utils";
import StyledComment from "../../components/comment/StyledComment";
import { IComment, ICommentsRes, IHotComment } from "../commType";
import { EMessageType, ESourceType } from "../enums";

interface IProps {
    albumId: number;
    commCount: number | undefined;
}

const AlbumComments: React.FunctionComponent<IProps> = (props: IProps) => {
    const { albumId, commCount } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [hotComms, setHotComms] = React.useState<IHotComment[]>();
    const [comms, setcomms] = React.useState<IComment[]>();

    const before = React.useMemo(() => {
        return comms && comms.length && comms[pageSize - 1]
            ? comms[pageSize - 1].time
            : undefined;
    }, [comms, pageSize]);

    const getDetailComments = React.useCallback(() => {
        setLoading(true);
        req.netease
            .AlbumComments(+albumId, pageSize, (page - 1) * pageSize, before)
            .then((res: ICommentsRes) => {
                res.hotComments && setHotComms(res.hotComments);
                setcomms(res.comments);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载专辑评论数据失败"
                )
            )
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albumId, page, pageSize]);

    React.useEffect(() => {
        commCount && getDetailComments();
    }, [commCount, getDetailComments, page, pageSize]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    return commCount ? (
        <Spin tip="Loading..." spinning={loading}>
            <Tabs defaultActiveKey="hot-comm" onChange={() => toTop()}>
                <Tabs.TabPane tab={`精彩评论`} key="hot-comm">
                    {hotComms && hotComms.length ? (
                        hotComms.map((hotComm) => (
                            <StyledComment
                                key={hotComm.commentId}
                                type={ESourceType.ALBUM}
                                id={albumId}
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
                                    type={ESourceType.ALBUM}
                                    id={albumId}
                                    comm={comm}
                                />
                            ))}
                            <Pagination
                                style={{ float: "right" }}
                                total={commCount || 0}
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
    ) : (
        <Empty />
    );
};

export default AlbumComments;
