import React from "react";
import { Comment, Tooltip, Avatar, Image } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { dateFormat } from "../utils";
import { IDetailComment, IDetailHotComment } from "../pages/detail/type";
import LazyLoad from "react-lazyload";
import LoadingImg from "./LoadingImg";

interface IProps {
    comm: IDetailHotComment | IDetailComment;
}

const StyledComment: React.FunctionComponent<IProps> = (props: IProps) => {
    const { comm } = props;

    const actions = React.useCallback(
        (comm: IDetailHotComment | IDetailComment) => {
            return [
                <Tooltip title="Like">
                    <span>
                        {comm.liked ? <LikeFilled /> : <LikeOutlined />}
                        <span className="comment-action">
                            {comm.likedCount}
                        </span>
                    </span>
                </Tooltip>,
                <span>Reply to</span>,
            ];
        },
        []
    );

    const avatar = React.useCallback(
        (comm: IDetailHotComment | IDetailComment) => {
            return (
                <Avatar
                    src={
                        <LazyLoad height={50} placeholder={<LoadingImg />}>
                            <Image
                                width={50}
                                height={50}
                                src={comm.user.avatarUrl}
                            />
                        </LazyLoad>
                    }
                    alt={comm.user.nickname}
                />
            );
        },
        []
    );

    return (
        <Comment
            actions={actions(comm)}
            author={comm.user.nickname}
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
