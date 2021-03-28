import React from "react";
import { Tooltip } from "antd";
import {
    LikeFilled,
    LikeOutlined,
    ShareAltOutlined,
    CommentOutlined,
} from "@ant-design/icons";

import { Event } from "../user/type";
import { countFormat } from "../../utils";
import { ELikeOpr, ESourceType } from "../../api/netease/types/like-type";
import reqs from "../../api/req";

interface IProps {
    event: Event;
    comm: {
        showComm: boolean;
        setShowComm: React.Dispatch<React.SetStateAction<boolean>>;
        curEventId: string;
        setCurEventId: React.Dispatch<React.SetStateAction<string>>;
    };
}

const EventActions: React.FunctionComponent<IProps> = (props: IProps) => {
    const { event, comm } = props;
    const [liked, setLiked] = React.useState(event.info.liked);

    const updateCurInfo = React.useCallback(() => {
        // if (comm.curEventId !== event.info.threadId) {
        //     comm.setCurEventId(event.info.threadId);
        // }
        // comm.setShowComm(!comm.showComm);

        // 可以采用该方案解决上面的点击上一次打开的关闭后才会展示下次的，但是会造成闪屏
        if (comm.curEventId !== event.info.threadId) {
            comm.setCurEventId(event.info.threadId);
            comm.setShowComm(true);
        } else {
            comm.setShowComm(!comm.showComm);
        }
    }, [comm, event.info.threadId]);

    const likeAction = React.useCallback(
        (type: ELikeOpr) => {
            reqs.neteaseLogined
                .likeSth(type, ESourceType.EVENT, event.info.threadId)
                .then((res) => {
                    if (res.code === 200) {
                        setLiked(type === ELikeOpr.LIKE);
                    }
                });
        },
        [event.info.threadId]
    );

    return (
        <>
            <Tooltip title={liked ? "dislike" : "Like"}>
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
                        {countFormat(event.info.likedCount)}
                    </span>
                </span>
            </Tooltip>
            <Tooltip title="Share">
                <span>
                    <ShareAltOutlined />
                    <span className="comment-action">
                        {event.info.shareCount}
                    </span>
                </span>
            </Tooltip>
            <Tooltip title="点击展开关闭评论">
                <span onClick={updateCurInfo}>
                    <CommentOutlined />
                    <span className="comment-action">
                        {event.info.commentCount}
                    </span>
                </span>
            </Tooltip>
            <span>Reply to</span>,
        </>
    );
};

export default EventActions;
