import React from "react";
import { observer } from "mobx-react-lite";
import { Modal, Switch, Typography } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import StyledDivider from "../../components/StyledDivider";

interface IProps {
    isModalVisible: boolean;
    setIsModalVisible: Function;
}

const SettingModal: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { isModalVisible, setIsModalVisible } = props;

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title="设置"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Typography.Title level={5}>
                本站所有数据均来源于网易云官方服务器，请注意操作！
            </Typography.Title>
            <StyledDivider />
            <div>
                <TranslationOutlined />
                <span>语言切换：</span>
                <Switch
                    checkedChildren="中文"
                    unCheckedChildren="英文"
                    defaultChecked
                    onChange={store.changeLocale}
                />
            </div>
        </Modal>
    );
});

export default SettingModal;
