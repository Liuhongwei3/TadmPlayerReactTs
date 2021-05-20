import React from "react";
import ReactDOM from "react-dom";
import { Input, Modal } from "antd";
import { useStore } from "../../hooks/useStore";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType } from "../enums";

interface IProps {
    eventId: number;
}

const ForwardEventModal: React.FC<IProps> = (props: IProps) => {
    const store = useStore();
    const { eventId } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const [forwardContent, setForwardContent] = React.useState("");

    const handleOk = React.useCallback(() => {
        reqs.neteaseLogined
            .forwardEvent(eventId, store.userInfo.userId, forwardContent.trim())
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "转发动态成功 ~");
                } else {
                    notify(EMessageType.WARNING, res.message || "转发动态失败 ~");
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message || "转发动态失败！");
            });
        setIsModalVisible(false);
    }, [eventId, forwardContent, store.userInfo.userId]);

    const handleCancel = React.useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return (
        <Modal
            title="转发动态"
            visible={isModalVisible}
            okText="转发"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input.TextArea
                allowClear={true}
                showCount={true}
                maxLength={140}
                value={forwardContent}
                onChange={(e) => setForwardContent(e.target.value)}
            />
        </Modal>
    );
};

const openForwardEventModal = (eventId: number) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(<ForwardEventModal eventId={eventId} />, mountElement);
};

export default openForwardEventModal;
