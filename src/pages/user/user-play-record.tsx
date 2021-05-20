import React from "react";
import LazyLoad from "react-lazyload";
import { Empty, Spin, Image, Radio } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { countFormat, notify, toTop } from "../../utils";
import req from "../../api/req";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType, EPlayRecordType } from "../enums";
import { IPlayRecRes } from "./type";
import { useStore } from "../../hooks/useStore";

interface IProps {
    userId: number;
}

const UserPlayRecord: React.FunctionComponent<IProps> = (props: IProps) => {
    const store = useStore();
    const { userId } = props;
    const [recordType, setRecordType] = React.useState(EPlayRecordType.WEEK);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [playRecordsRes, setPlayRecordsRes] = React.useState<IPlayRecRes>();

    const getPlaylists = React.useCallback(() => {
        setLoading(true);
        req.neteaseLogined
            .userPlayRecords(userId, recordType)
            .then((res) => {
                setPlayRecordsRes({
                    ...res,
                    data: res.weekData || res.allData,
                });
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户听歌排行数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [recordType, userId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getPlaylists();
    }, [getPlaylists]);

    const toDetail = React.useCallback(
        (id: number) => {
            store.updateCurSongId(id);
        },
        [store]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {playRecordsRes && playRecordsRes.code === 200 ? (
                <>
                    <Radio.Group
                        buttonStyle="solid"
                        defaultValue={EPlayRecordType.WEEK}
                        onChange={(e) => setRecordType(e.target.value)}
                    >
                        <Radio.Button value={EPlayRecordType.WEEK}>
                            最近一周
                        </Radio.Button>
                        <Radio.Button value={EPlayRecordType.ALL}>
                            所有时间
                        </Radio.Button>
                    </Radio.Group>

                    <StyledWrapper>
                        {playRecordsRes.data.map((item) => (
                            <StyledItem
                                key={item.song.id}
                                onClick={() => toDetail(item.song.id)}
                            >
                                <div
                                    style={{
                                        width: DEFAULT_IMG_WIDTH,
                                        height: DEFAULT_IMG_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={DEFAULT_IMG_HEIGHT}
                                        placeholder={<LoadingImg />}
                                    >
                                        <Image
                                            alt="detail-cover"
                                            loading="lazy"
                                            style={{ opacity: 0.8 }}
                                            preview={false}
                                            width={DEFAULT_IMG_WIDTH}
                                            height={DEFAULT_IMG_HEIGHT}
                                            src={item.song.al.picUrl}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>
                                    <StyledCount>
                                        <CustomerServiceOutlined />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {item.song.name} - {item.song.ar[0].name}
                                </StyledName>
                            </StyledItem>
                        ))}
                    </StyledWrapper>
                </>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default UserPlayRecord;
