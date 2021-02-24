import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Radio, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import { Artist, ESingerType, List } from "./type";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledDivider from "../../components/StyledDivider";
import { DEFAULT_IMG_HEIGHT, DEFAULT_IMG_WIDTH } from "../../defaultConfig";

const INIT_LIMIT = 24;
const Types = [
    { title: "华语", value: ESingerType.CHINESE },
    { title: "欧美", value: ESingerType.ENGLISH },
    { title: "韩国", value: ESingerType.KOREAN },
    { title: "日本", value: ESingerType.JAPANESE },
];

const TopSinger: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [type, setType] = React.useState<number>(ESingerType.CHINESE);
    const [singers, setSingers] = React.useState<List>();

    const getTopSingers = React.useCallback(() => {
        setLoading(true);
        req.netease
            .topSinger(type)
            .then((res) => {
                setSingers(res.list);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌手排行榜数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [type]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getTopSingers();
    }, [getTopSingers]);

    const updateCurInfo = React.useCallback((type: number) => {
        setLimit(INIT_LIMIT);
        setType(type);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div>
                <span>地区：</span>
                <Radio.Group
                    buttonStyle="solid"
                    defaultValue={ESingerType.CHINESE}
                    onChange={(e) => updateCurInfo(e.target.value)}
                >
                    {Types.map((type) => (
                        <Radio.Button key={type.title} value={type.value}>
                            {type.title}
                        </Radio.Button>
                    ))}
                </Radio.Group>

                <span style={{ float: "right", marginRight: 10 }}>
                    更新时间：{dateFormat(singers?.updateTime)}
                </span>
            </div>

            <StyledDivider />

            {singers?.artists && singers?.artists.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {singers.artists.slice(0, limit).map((item: Artist) => {
                            return (
                                <StyledItem
                                    key={item.id}
                                    onClick={() => toDetail(item.id)}
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
                                            <img
                                                style={{ opacity: 0.7 }}
                                                width={DEFAULT_IMG_WIDTH}
                                                height={DEFAULT_IMG_HEIGHT}
                                                alt="detail-cover"
                                                src={item.picUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <CustomerServiceOutlined />
                                            {countFormat(item.musicSize)}
                                        </StyledCount>
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            热度：{item.score}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_IMG_WIDTH}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={limit >= singers.artists.length}
                        loading={loading}
                        onClick={() => setLimit(limit + 16)}
                    >
                        Loading More
                    </Button>
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default TopSinger;
