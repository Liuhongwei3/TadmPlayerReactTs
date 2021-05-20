import React from "react";
import { Link } from "react-router-dom";
import { Comment, Tooltip, Avatar, Image, Popconfirm } from "antd";
import { LikeFilled, LikeOutlined, DeleteTwoTone } from "@ant-design/icons";

import { countFormat, dateFormat, notify } from "../../utils";
import LoadingImg from "../LoadingImg";
import { IComment, IHotComment } from "../../pages/commType";
import { ELikeOpr } from "../../api/netease/types/like-type";
import reqs from "../../api/req";
import { EMessageType, ESourceType } from "../../pages/enums";
import openReplyCommModal from "./reply-comm-modal";
import { useStore } from "../../hooks/useStore";

interface IProps {
    type: ESourceType;
    id: number | string;
    comm: IHotComment | IComment;
}

const StyledComment: React.FunctionComponent<IProps> = (props: IProps) => {
    const store = useStore();
    const { type: sourceType, id: sourceId, comm } = props;
    const [liked, setLiked] = React.useState(comm.liked);

    const likeAction = React.useCallback(
        (type: ELikeOpr) => {
            reqs.neteaseLogined
                .likeComment(type, sourceType, sourceId, comm.commentId)
                .then((res) => {
                    if (res.code === 200) {
                        setLiked(type === ELikeOpr.LIKE);
                    }
                });
        },
        [comm.commentId, sourceId, sourceType]
    );

    const replyCommFunc = React.useCallback(() => {
        openReplyCommModal(sourceType, sourceId, comm);
    }, [comm, sourceId, sourceType]);

    const delComm = React.useCallback(() => {
        reqs.neteaseLogined
            .delComment(sourceType, sourceId, comm.commentId)
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "删除评论成功 ~");
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);
                } else {
                    notify(
                        EMessageType.WARNING,
                        res.message || "删除评论失败 ~"
                    );
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message || "删除评论失败！");
            });
    }, [comm.commentId, sourceId, sourceType]);

    const actions = React.useCallback(
        (comm: IHotComment | IComment) => {
            return [
                <Tooltip title="Like">
                    <span>
                        {liked ? (
                            <LikeFilled
                                onClick={() => likeAction(ELikeOpr.DISLIKE)}
                            />
                        ) : (
                            <LikeOutlined
                                onClick={() => likeAction(ELikeOpr.LIKE)}
                            />
                        )}
                        <span className="comment-action">
                            {countFormat(comm.likedCount)}
                        </span>
                    </span>
                </Tooltip>,
                <span onClick={replyCommFunc}>Reply to</span>,
                comm.user.userId === store.userInfo.userId ? (
                    <Popconfirm
                        title="确定要删除当前评论吗？"
                        okText="是的"
                        cancelText="否"
                        placement="right"
                        onConfirm={delComm}
                    >
                        <DeleteTwoTone
                            style={{ fontSize: 16 }}
                            twoToneColor="#ff5d5d"
                        />
                    </Popconfirm>
                ) : null,
            ];
        },
        [delComm, likeAction, liked, replyCommFunc, store.userInfo.userId]
    );

    const avatar = React.useCallback((comm: IHotComment | IComment) => {
        return (
            <Avatar
                alt={comm.user.nickname}
                src={
                    <Image
                        alt="comment-cover"
                        loading="lazy"
                        style={{ opacity: 0.8 }}
                        src={comm.user.avatarUrl}
                        placeholder={<LoadingImg />}
                    />
                }
            />
        );
    }, []);

    return (
        <Comment
            actions={actions(comm)}
            author={
                <Link to={`/user/${comm.user.userId}`}>
                    {comm.user.nickname}
                </Link>
            }
            avatar={avatar(comm)}
            content={comm.content}
            datetime={dateFormat(comm.time, "more")}
        >
            {/* filter has delete comment */}
            {comm.beReplied.length && comm.beReplied[0].content ? (
                <Comment
                    author={comm.beReplied[0].user.nickname}
                    avatar={avatar(comm.beReplied[0])}
                    content={comm.beReplied[0].content}
                    datetime={dateFormat(comm.beReplied[0].time, "more")}
                />
            ) : null}
        </Comment>
    );
};

export default StyledComment;
