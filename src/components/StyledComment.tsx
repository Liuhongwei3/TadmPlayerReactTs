import React from "react";
import { Link } from "react-router-dom";
import { Comment, Tooltip, Avatar, Image } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import { countFormat, dateFormat } from "../utils";
import LoadingImg from "./LoadingImg";
import { IComment, IHotComment } from "../pages/commType";
import { ELikeOpr, ESourceType } from "../api/netease/types/like-type";
import reqs from "../api/req";

interface IProps {
    type: ESourceType;
    id: number | string;
    comm: IHotComment | IComment;
}

const StyledComment: React.FunctionComponent<IProps> = (props: IProps) => {
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
                <span>Reply to</span>,
            ];
        },
        [likeAction, liked]
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
