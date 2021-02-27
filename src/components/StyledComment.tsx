import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { Comment, Tooltip, Avatar, Image } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import { countFormat, dateFormat } from "../utils";
import LoadingImg from "./LoadingImg";
import { IComment, IHotComment } from "../pages/commType";

interface IProps {
    comm: IHotComment | IComment;
}

const StyledComment: React.FunctionComponent<IProps> = (props: IProps) => {
    const { comm } = props;

    const actions = React.useCallback((comm: IHotComment | IComment) => {
        return [
            <Tooltip title="Like">
                <span>
                    {comm.liked ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action">
                        {countFormat(comm.likedCount)}
                    </span>
                </span>
            </Tooltip>,
            <span>Reply to</span>,
        ];
    }, []);

    const avatar = React.useCallback((comm: IHotComment | IComment) => {
        return (
            <Avatar
                alt={comm.user.nickname}
                src={
                    <LazyLoad height={50} placeholder={<LoadingImg />}>
                        <Image
                            width={50}
                            height={50}
                            src={comm.user.avatarUrl}
                        />
                    </LazyLoad>
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
