import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Avatar, Modal } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import { countFormat, notify } from "../../utils";
import reqs from "../../api/req";
import { EDetailSongOprType } from "../enums";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

interface IProps {
    op: EDetailSongOprType;
    track: number;
}

const AddSongToDetailDialog: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { op, track } = props;
    const [show, setShow] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!store.userPlaylists.length) {
            notify("warning", "还没有歌单呢，先去创建一个吧！");
        }
    }, [store.userPlaylists.length]);

    const handleCancel = () => {
        setShow(false);
    };

    const onFinish = React.useCallback(
        (pid: number) => {
            reqs.neteaseLogined
                .addDeleteSongFromDetail(op, pid, [track])
                .then(() => {
                    notify("success", "收藏歌曲到歌单成功");
                    handleCancel();
                })
                .catch((e) => {
                    notify("error", "收藏歌曲到歌单失败");
                });
        },
        [op, track]
    );

    return store.userPlaylists.length ? (
        <Modal
            title="收藏到歌单"
            visible={show}
            onCancel={handleCancel}
            footer={null}
        >
            <StyledContent>
                {store.userPlaylists.map((playlist) => (
                    <StyledItem
                        key={playlist.id}
                        onClick={() => onFinish(playlist.id)}
                    >
                        <Avatar src={playlist.coverImgUrl} />
                        <span style={{ marginLeft: 20 }}>{playlist.name}</span>
                        <span style={{ marginLeft: 20 }}>
                            <CustomerServiceOutlined />
                            {countFormat(playlist.playCount)}
                        </span>
                    </StyledItem>
                ))}
            </StyledContent>
        </Modal>
    ) : null;
});

const StyledItem = styled.div`
    margin: 10px;
    padding: 5px;
    border-radius: 5px;

    &:hover {
        background-color: #d4d4d4;
        cursor: pointer;
    }
`;

const StyledContent = styled.div`
    max-height: 420px;
    overflow-y: scroll;
`;

const openAddSongToDetailDialog = (op: EDetailSongOprType, track: number) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(
        <AddSongToDetailDialog op={op} track={track} />,
        mountElement
    );
};

export default openAddSongToDetailDialog;
