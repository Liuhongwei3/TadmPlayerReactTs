import React from "react";
import { observer } from "mobx-react-lite";
import { Modal, Select, Switch, Typography } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import StyledDivider from "../../components/StyledDivider";
import styled from "styled-components";
import { ECanvasType, ELanguageType, ICanvasTypeText } from "../enums";

interface IProps {
    isModalVisible: boolean;
    setIsModalVisible: Function;
}

interface ISettings {
    locale: boolean;
    canvasType: ECanvasType;
    curCircleCanvasColorIndex: number;
    showUserBackImg: boolean;
}

const SettingModal: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { isModalVisible, setIsModalVisible } = props;
    const [settings, setSettings] = React.useState<ISettings>({
        locale: true,
        canvasType: ECanvasType.SQUARE,
        curCircleCanvasColorIndex: 0,
        showUserBackImg: true,
    });

    const updateAllToStore = React.useCallback(
        (sets: ISettings) => {
            store.changeLocale(sets.locale);
            store.updateCurCanvasType(sets.canvasType);
            store.updateCurCircleCanvasColorIndex(
                sets.curCircleCanvasColorIndex
            );
            store.updateShowUserBackImg(sets.showUserBackImg);
        },
        [store]
    );

    React.useEffect(() => {
        const localSettings = window.localStorage.getItem("settings");
        if (localSettings) {
            updateAllToStore(JSON.parse(localSettings) as ISettings);
        }
    }, [updateAllToStore]);

    const handleCircleCanvasColorChange = React.useCallback(
        (v: number) => {
            setSettings({
                ...settings,
                curCircleCanvasColorIndex: v,
            });
        },
        [settings]
    );

    const saveSettingsToLocalStorage = React.useCallback(() => {
        if (settings) {
            window.localStorage.setItem("settings", JSON.stringify(settings));
        }
    }, [settings]);

    const handleOk = React.useCallback(() => {
        updateAllToStore(settings);
        saveSettingsToLocalStorage();
        setIsModalVisible(false);
    }, [
        saveSettingsToLocalStorage,
        setIsModalVisible,
        settings,
        updateAllToStore,
    ]);

    const handleCancel = React.useCallback(() => {
        setIsModalVisible(false);
    }, [setIsModalVisible]);

    return (
        <Modal
            title="设置"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Typography.Text>
                本站所有数据均来源于网易云官方服务器，请注意操作！
                <br />
                登录账号后的相关操作除提示失败的其余操作均同步至服务器，请不要重复操作！（因本站做了接口缓存处理-部分页面可能会在操作后未更新！）
            </Typography.Text>
            <StyledDivider />

            <StyledDiv>
                <TranslationOutlined />
                <span>语言（antd-comp）：</span>
                <Switch
                    checkedChildren={ELanguageType.CN}
                    unCheckedChildren={ELanguageType.EN}
                    defaultChecked
                    onChange={(v) => setSettings({ ...settings, locale: v })}
                />
            </StyledDiv>

            <StyledDiv>
                <span>用户页背景：</span>
                <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked={store.showUserBackImg}
                    onChange={(v) =>
                        setSettings({ ...settings, showUserBackImg: v })
                    }
                />
            </StyledDiv>

            <StyledDiv>
                <span>音乐可视化：</span>
                <Select
                    defaultValue={store.curCanvasType}
                    onChange={(v) =>
                        setSettings({ ...settings, canvasType: v })
                    }
                >
                    <Select.Option value={ECanvasType.NONE}>
                        {ICanvasTypeText[ECanvasType.NONE]}
                    </Select.Option>
                    <Select.Option value={ECanvasType.SQUARE}>
                        {ICanvasTypeText[ECanvasType.SQUARE]}
                    </Select.Option>
                    <Select.Option value={ECanvasType.CIRCLEBAR}>
                        {ICanvasTypeText[ECanvasType.CIRCLEBAR]}
                    </Select.Option>
                    <Select.Option value={ECanvasType.CIRCLEWAVE}>
                        {ICanvasTypeText[ECanvasType.CIRCLEWAVE]}
                    </Select.Option>
                </Select>
                <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;注：更改后重新进入页面将更新该设置
                </span>
            </StyledDiv>

            <StyledDiv>
                <span>圆形 Canvas 颜色：</span>

                <div
                    className="he color-1"
                    onClick={() => handleCircleCanvasColorChange(0)}
                ></div>
                <div
                    className="he color-2"
                    onClick={() => handleCircleCanvasColorChange(1)}
                ></div>
                <div
                    className="he color-3"
                    onClick={() => handleCircleCanvasColorChange(2)}
                ></div>
                <div
                    className="he color-4"
                    onClick={() => handleCircleCanvasColorChange(3)}
                ></div>
                <div
                    className="he color-5"
                    onClick={() => handleCircleCanvasColorChange(4)}
                ></div>
            </StyledDiv>
        </Modal>
    );
});

export default SettingModal;

const StyledDiv = styled.div`
    margin: 10px 0;
    display: flex;
    align-items: center;

    .he {
        height: 40px;
        margin: 0 3px;
        padding: 0 15px;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        border: none;
        outline: none;
    }

    .color-1 {
        background-image: linear-gradient(
            #f00 0%,
            #f00 30%,
            #f90 30%,
            #f90 70%,
            #ff0 70%,
            #ff0 100%
        );
    }

    .color-2 {
        background-color: #ff0;
    }
    .color-3 {
        background-image: linear-gradient(#00f, #06f, #09f, #0ff);
    }
    .color-4 {
        background-image: linear-gradient(#fb6d6b, #c10056, #a50053, #51074b);
    }
    .color-5 {
        background-image: linear-gradient(
            #ff422d 0%,
            #ff422d 50%,
            #6072ff 50%,
            #6072ff 100%
        );
    }
`;
