import React from "react";
import { Tooltip } from "antd";
import {
    LikeFilled,
    LikeOutlined,
    ShareAltOutlined,
    CommentOutlined,
} from "@ant-design/icons";

import { Event } from "../type";

interface IProps {
    event: Event;
    comm: {
        showComm: boolean;
        setShowComm: React.Dispatch<React.SetStateAction<boolean>>;
        curEventId: string;
        setCurEventId: React.Dispatch<React.SetStateAction<string>>;
    };
}

const UserEventActions: React.FunctionComponent<IProps> = (props: IProps) => {
    const { event, comm } = props;

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

    return (
        <>
            <Tooltip title="Like">
                <span>
                    {event.info.liked ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action">
                        {event.info.likedCount}
                    </span>
                </span>
            </Tooltip>
            ,
            <Tooltip title="Share">
                <span>
                    <ShareAltOutlined />
                    <span className="comment-action">
                        {event.info.shareCount}
                    </span>
                </span>
            </Tooltip>
            ,
            <Tooltip title="Comment">
                <span onClick={updateCurInfo}>
                    <CommentOutlined />
                    <span className="comment-action">
                        {event.info.commentCount}
                    </span>
                </span>
            </Tooltip>
            ,<span>Reply to</span>,
        </>
    );
};

export default UserEventActions;
