import React from "react";
import styled from "styled-components";
import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { copyData, notify } from "../../utils";
import { EMessageType, EShareResourceType } from "../enums";
import openShareResourceEventModal from "./share-resource-event-modal";

interface IProps {
    scale: boolean;
    type: EShareResourceType;
    id: number;
}

const ShareResource: React.FC<IProps> = (props: IProps) => {
    const { scale, type, id } = props;
    const [visible, setVisible] = React.useState(false);

    const handleShareCopy = React.useCallback(() => {
        let copied = false;
        switch (type) {
            case EShareResourceType.SONG:
                copied = copyData(`https://music.163.com/song?id=${id}`);
                break;
            case EShareResourceType.PLAYLIST:
                copied = copyData(`https://music.163.com/playlist?id=${id}`);
                break;
            default:
                console.log("unknown type", type);
        }
        if (copied) {
            notify(
                EMessageType.SUCCESS,
                "复制链接成功，请使用浏览器打开链接 ~"
            );
        }
    }, [id, type]);

    return (
        <Popover
            title="分享到"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <StyledShareMenu>
                    <Button
                        block={true}
                        onClick={() => {
                            openShareResourceEventModal(type, id);
                            setVisible(false);
                        }}
                    >
                        云音乐动态
                    </Button>
                    <Button
                        block={true}
                        onClick={() => {
                            handleShareCopy();
                            setVisible(false);
                        }}
                    >
                        复制链接
                    </Button>
                </StyledShareMenu>
            }
        >
            <ShareAltOutlined className={scale ? "ant-svg-scale" : ""} />
        </Popover>
    );
};

export default ShareResource;

const StyledShareMenu = styled.div`
    button {
        margin-top: 6px;
    }
`;
