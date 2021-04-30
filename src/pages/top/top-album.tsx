import React from "react";
import { Empty, Spin, Image, Radio, Select } from "antd";
import LazyLoad from "react-lazyload";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { countFormat, notify } from "../../utils";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledCount from "../../components/detail/StyledCount";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType } from "../enums";
import {
    EALbumTopType,
    ITopAlbumRes,
} from "../../api/netease/types/album-type";
import RMBSvg from "../../components/svgs/rmb-svg";
import StyledDivider from "../../components/StyledDivider";

const Types = [
    { title: "日榜", value: EALbumTopType.DAILY },
    { title: "周榜", value: EALbumTopType.WEEK },
    { title: "年榜", value: EALbumTopType.YEAR },
];
const Years = [2021, 2020, 2019, 2018];

const TopAlbum: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [year, setYear] = React.useState<number>(Years[0]);
    const [type, setType] = React.useState<EALbumTopType>(Types[0].value);
    const [albums, setAlbums] = React.useState<ITopAlbumRes>();

    const getTopAlbums = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .topAlbum(type, undefined, year)
            .then((res) => {
                setAlbums(res);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载专辑排行榜数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [type, year]);

    React.useEffect(() => {
        getTopAlbums();
    }, [getTopAlbums]);

    const updateCurInfo = React.useCallback((type: EALbumTopType) => {
        setType(type);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/album/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div style={{ padding: "0 20px" }}>
                <span>类型：</span>
                <Radio.Group
                    buttonStyle="solid"
                    defaultValue={Types[0].value}
                    onChange={(e) => updateCurInfo(e.target.value)}
                >
                    {Types.map((type) => (
                        <Radio.Button key={type.title} value={type.value}>
                            {type.title}
                        </Radio.Button>
                    ))}
                </Radio.Group>

                <div style={{ float: "right", marginRight: 10 }}>
                    <span>年份：</span>
                    <Select
                        disabled={type !== EALbumTopType.YEAR}
                        defaultValue={2021}
                        onChange={(v) => setYear(v)}
                    >
                        {Years.map((y) => (
                            <Select.Option key={y} value={y}>
                                {y}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            <StyledDivider />

            {albums?.products.length ? (
                <StyledWrapper>
                    {albums.products.map((item) => {
                        return (
                            <StyledItem
                                key={`top-album-${item.albumId}`}
                                onClick={() => toDetail(item.albumId)}
                            >
                                <div
                                    style={{
                                        width: DEFAULT_IMG_WIDTH,
                                        height: DEFAULT_IMG_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={100}
                                        placeholder={<LoadingImg />}
                                    >
                                        <Image
                                            alt="album-cover"
                                            loading="lazy"
                                            style={{ opacity: 0.8 }}
                                            preview={false}
                                            width={DEFAULT_IMG_WIDTH}
                                            height={DEFAULT_IMG_HEIGHT}
                                            src={item.coverUrl}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>
                                    <StyledCount>{`已售：${countFormat(
                                        item.saleNum
                                    )}`}</StyledCount>
                                    <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                        {`售价：${item.price}`}
                                        <RMBSvg />
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {`${item.albumName}-${item.artistName}`}
                                </StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default TopAlbum;
