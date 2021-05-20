import React from "react";
import ReactDOM from "react-dom";
import { Input, Modal } from "antd";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType, ESourceType } from "../../pages/enums";
import { EReplyOpr } from "../../api/netease/types/reply-type";
import { IHotComment, IComment } from "../../pages/commType";

interface IProps {
    type: ESourceType;
    id: string | number;
    comm: IHotComment | IComment;
}

const ReplyCommModal: React.FC<IProps> = (props: IProps) => {
    const { type, id, comm } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const [replyContent, setReplyContent] = React.useState("");

    const handleOk = React.useCallback(() => {
        reqs.neteaseLogined
            .replyComment(
                EReplyOpr.REPLY,
                type,
                id,
                replyContent.trim(),
                comm.commentId
            )
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "回复评论成功 ~");
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);
                } else {
                    notify(
                        EMessageType.WARNING,
                        res.message || "回复评论失败 ~"
                    );
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message || "回复评论失败！");
            });
        setIsModalVisible(false);
    }, [type, id, replyContent, comm.commentId]);

    const handleCancel = React.useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return (
        <Modal
            title="回复评论"
            okText="发送"
            visible={isModalVisible}
            okButtonProps={{
                disabled: replyContent.trim().length === 0,
            }}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input.TextArea
                autoFocus={true}
                allowClear={true}
                showCount={true}
                maxLength={140}
                placeholder={`回复 ${comm.user.nickname}：`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
            />
        </Modal>
    );
};

const openReplyCommModal = (
    type: ESourceType,
    id: string | number,
    comm: IHotComment | IComment
) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(
        <ReplyCommModal type={type} id={id} comm={comm} />,
        mountElement
    );
};

export default openReplyCommModal;
