import React from "react";
import ReactDOM from "react-dom";
import { Input, Modal } from "antd";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType, ESourceType } from "../../pages/enums";
import { EReplyOpr } from "../../api/netease/types/reply-type";

interface IProps {
    type: ESourceType;
    id: string | number;
}

const PublishCommModal: React.FC<IProps> = (props: IProps) => {
    const { type, id } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const [replyContent, setReplyContent] = React.useState("");

    const handleOk = React.useCallback(() => {
        reqs.neteaseLogined
            .replyComment(
                EReplyOpr.PUBLISH,
                type,
                id,
                replyContent.trim()
            )
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "发布评论成功 ~");
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);
                } else {
                    notify(
                        EMessageType.WARNING,
                        res.message || "发布评论失败 ~"
                    );
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message || "发布评论失败！");
            });
        setIsModalVisible(false);
    }, [type, id, replyContent]);

    const handleCancel = React.useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return (
        <Modal
            title="发布评论"
            okText="评论"
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
                placeholder={`写点东西 ~`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
            />
        </Modal>
    );
};

const openPublishCommModal = (
    type: ESourceType,
    id: string | number,
) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(
        <PublishCommModal type={type} id={id} />,
        mountElement
    );
};

export default openPublishCommModal;
