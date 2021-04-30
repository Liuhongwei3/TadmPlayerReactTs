import React from "react";
import styled from "styled-components";
import { Empty, Pagination, Spin } from "antd";
import reqs from "../../../api/req";
import { notify } from "../../../utils";
import { ICommentsRes } from "../../commType";
import { ESourceType } from "../../../api/netease/types/like-type";
import StyledComment from "../../../components/StyledComment";
import { EMessageType } from "../../enums";

interface IProps {
    id: number;
}

const pageSize = 10;

const SongComments: React.FC<IProps> = (props: IProps) => {
    const { id } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [comms, setcomms] = React.useState<ICommentsRes>();

    const before = React.useMemo(() => {
        return comms && comms.comments.length && comms.comments[pageSize - 1]
            ? comms.comments[pageSize - 1].time
            : undefined;
    }, [comms]);

    const getDetailComments = React.useCallback(() => {
        if (!id) return;
        setLoading(true);
        reqs.netease
            .getMusicComment(id, pageSize, (page - 1) * pageSize, before)
            .then((res) => {
                setcomms(res);
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page, pageSize]);

    React.useEffect(() => {
        if (!id) return;

        setcomms(undefined);
        getDetailComments();
    }, [id, getDetailComments, page]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
    }, []);

    return id ? (
        <Spin style={{ minHeight: "80vh" }} spinning={loading}>
            {comms && comms.hotComments && !!comms.hotComments.length && (
                <StyledSongComment>
                    <StyledCommTitle>精彩评论</StyledCommTitle>
                    {comms.hotComments.map((comm) => (
                        <StyledComment
                            key={comm.commentId}
                            type={ESourceType.SONG}
                            id={id}
                            comm={comm}
                        />
                    ))}
                </StyledSongComment>
            )}

            {comms && !!comms.comments.length ? (
                <StyledSongComment>
                    <StyledCommTitle>最新评论（{comms.total}）</StyledCommTitle>
                    {comms.comments.map((comm) => (
                        <StyledComment
                            key={comm.commentId}
                            type={ESourceType.SONG}
                            id={id}
                            comm={comm}
                        />
                    ))}
                    <Pagination
                        style={{ float: "right" }}
                        total={comms.total}
                        current={page}
                        showSizeChanger={false}
                        onChange={(page, pageSize) =>
                            pageChange(page, pageSize)
                        }
                    />
                </StyledSongComment>
            ) : (
                <Empty />
            )}
        </Spin>
    ) : null;
};

export default SongComments;

const StyledCommTitle = styled.div`
    color: #efb448;
    font-size: 16px;
`;

const StyledSongComment = styled.div`
    width: 66vw;
    font-size: 14px;
    margin: 24px auto;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
