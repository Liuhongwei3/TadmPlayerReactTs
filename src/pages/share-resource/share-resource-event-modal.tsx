import React from "react";
import ReactDOM from "react-dom";
import { Input, Modal } from "antd";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType, EShareResourceType } from "../enums";

interface IProps {
    type: EShareResourceType;
    id: number;
}

const ShareResourceEventModal: React.FC<IProps> = (props: IProps) => {
    const { type, id } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const [forwardContent, setForwardContent] = React.useState("");

    const handleOk = React.useCallback(() => {
        reqs.neteaseLogined
            .forwardResourceToEvent(type, id, forwardContent.trim())
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "分享到云音乐动态成功 ~");
                } else {
                    notify(
                        EMessageType.WARNING,
                        res.message || "分享到云音乐动态失败 ~"
                    );
                }
            })
            .catch((e) => {
                notify(
                    EMessageType.ERROR,
                    e.message || "分享到云音乐动态失败！"
                );
            });
        setIsModalVisible(false);
    }, [forwardContent, id, type]);

    const handleCancel = React.useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return (
        <Modal
            title="分享到云音乐动态"
            visible={isModalVisible}
            okText="分享"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input.TextArea
                autoFocus={true}
                allowClear={true}
                showCount={true}
                maxLength={140}
                value={forwardContent}
                onChange={(e) => setForwardContent(e.target.value)}
            />
        </Modal>
    );
};

const openShareResourceEventModal = (type: EShareResourceType, id: number) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(
        <ShareResourceEventModal type={type} id={id} />,
        mountElement
    );
};

export default openShareResourceEventModal;
